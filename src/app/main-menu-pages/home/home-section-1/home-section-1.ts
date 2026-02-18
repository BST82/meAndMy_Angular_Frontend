import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { HomeSection1Service } from './home-section-services/home-section-1-service';
import { MoonApiResponse } from '../../../interfaces/moonPhase.interface';

interface LunarPhase {
  id: number;
  name: string;
  day: string;
  angle: number;
  desc: string;
}

@Component({
  selector: 'app-home-section-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-section-1.html',
  styleUrl: './home-section-1.scss',
})
export class HomeSection1 implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  cityName = '';
  regionInfo = '';
  isLoading = true;
  currentPhase: LunarPhase | null = null;
  
  lunarPhases: LunarPhase[] = [
    { id: 0, name: "New Moon", day: "", angle: 0, desc: "The moon is between Earth and the sun." },
    { id: 1, name: "Waxing Crescent", day: "", angle: Math.PI / 4, desc: "A sliver of the moon becomes illuminated." },
    { id: 2, name: "First Quarter", day: "", angle: Math.PI / 2, desc: "Half of the moon's visible surface is illuminated." },
    { id: 3, name: "Waxing Gibbous", day: "", angle: 3 * Math.PI / 4, desc: "More than half of the moon is illuminated." },
    { id: 4, name: "Full Moon", day: "", angle: Math.PI, desc: "The moon is fully illuminated by the sun." },
    { id: 5, name: "Waning Gibbous", day: "", angle: 5 * Math.PI / 4, desc: "The illuminated portion begins to shrink." },
    { id: 6, name: "Last Quarter", day: "", angle: 3 * Math.PI / 2, desc: "The opposite half is illuminated." },
    { id: 7, name: "Waning Crescent", day: "", angle: 7 * Math.PI / 4, desc: "A small sliver remains before the cycle restarts." }
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private moon!: THREE.Mesh;
  private sunLight!: THREE.DirectionalLight;
  private starMesh!: THREE.Points;
  private frameId: number | null = null;
  private clock = new THREE.Clock();

  private targetLightAngle = 0;
  private currentLightAngle = 0;
  private targetMoonRotationY = 0;
  private currentMoonRotationY = 0;

  // Inject ChangeDetectorRef to fix the NG0100 error
  constructor(
    private moonService: HomeSection1Service,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true; 
    this.fetchLiveMoonData();
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    if (this.renderer) this.renderer.dispose();
  }

  private fetchLiveMoonData() {
    this.moonService.getMoonData().subscribe({
      next: (data: MoonApiResponse) => {
        console.log('Component: Data received!', data);
        this.cityName = data.location.city.toUpperCase();
        this.regionInfo = `${data.location.region}, ${data.location.country}`;

        const apiPhaseName = data.moon_data.moon_phase; 
        const phaseIndex = this.lunarPhases.findIndex(p => 
          p.name.toLowerCase() === apiPhaseName.toLowerCase()
        );

        const targetIndex = phaseIndex !== -1 ? phaseIndex : 0;

        this.lunarPhases[targetIndex].day = `Rise: ${data.moon_data.moonrise} | Set: ${data.moon_data.moonset}`;
        this.lunarPhases[targetIndex].desc = `Illumination: ${data.moon_data.moon_illumination}% - ${this.lunarPhases[targetIndex].desc}`;

        // Using setTimeout or detectChanges fixes the NG0100 Error
        setTimeout(() => {
          this.selectPhase(targetIndex);
          this.cdr.detectChanges(); 
        }, 0);
      },
      error: (err) => {
        console.error('Moon Data Error:', err);
        this.isLoading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  private initThreeJS() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030407, 0.0015);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 120;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.scene.add(this.sunLight);
    this.scene.add(new THREE.AmbientLight(0x111122, 0.05));

    const geometry = new THREE.SphereGeometry(30, 64, 64);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.1 });
    this.moon = new THREE.Mesh(geometry, material);
    this.moon.rotation.z = THREE.MathUtils.degToRad(6.68);
    this.scene.add(this.moon);

    new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg', (tex) => {
      material.map = tex;
      material.bumpMap = tex;
      material.bumpScale = 0.5;
      material.needsUpdate = true;
      this.isLoading = false;
      this.cdr.detectChanges(); // Ensure UI reflects loading state change
    });

    this.createStars();
  }

  private createStars() {
    const starsGeom = new THREE.BufferGeometry();
    const posArr = new Float32Array(2000 * 3);
    for (let i = 0; i < 6000; i++) posArr[i] = (Math.random() - 0.5) * 600;
    starsGeom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    this.starMesh = new THREE.Points(starsGeom, new THREE.PointsMaterial({ size: 0.7, color: 0xffffff, transparent: true, opacity: 0.8 }));
    this.scene.add(this.starMesh);
  }

  // This is now purely internal, triggered only by API or code
  selectPhase(index: number) {
    const selected = this.lunarPhases[index];
    this.currentPhase = selected;

    let rawTarget = selected.angle - Math.PI;
    let diff = rawTarget - (this.targetLightAngle % (Math.PI * 2));
    
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    
    this.targetLightAngle += diff;
    this.targetMoonRotationY = selected.angle;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getRightPosition(i: number): number {
    const baseRight = 60; 
    const curvePower = 35; 
    const arcOffset = (4 - Math.abs(i - 3.5)) * curvePower; 
    return baseRight + arcOffset;
  }

  private animate() {
    this.frameId = requestAnimationFrame(() => this.animate());
    this.currentLightAngle += (this.targetLightAngle - this.currentLightAngle) * 0.05;
    this.sunLight.position.set(Math.sin(this.currentLightAngle) * 200, 20, -Math.cos(this.currentLightAngle) * 200);

    this.currentMoonRotationY += (this.targetMoonRotationY - this.currentMoonRotationY) * 0.03;
    this.moon.rotation.y = this.currentMoonRotationY + (this.clock.getElapsedTime() * 0.01);
    this.starMesh.rotation.y = this.clock.getElapsedTime() * 0.002;

    this.renderer.render(this.scene, this.camera);
  }
}