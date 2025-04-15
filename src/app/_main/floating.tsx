"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface FloatingObjectsProps {
    position: "left" | "right"
}

export function FloatingObjects({ position }: FloatingObjectsProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth / 4, window.innerHeight)
        renderer.setClearColor(0xffffff, 0)
        containerRef.current.appendChild(renderer.domElement)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // Create objects
        const objects: THREE.Mesh[] = []

        // Position multiplier based on side
        const posMultiplier = position === "left" ? -1 : 1

        // Paper/document shape
        const paperGeometry = new THREE.PlaneGeometry(1, 1.4)
        const paperMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.2,
            side: THREE.DoubleSide,
        })

        const paper = new THREE.Mesh(paperGeometry, paperMaterial)
        paper.position.set(posMultiplier * 2, 1, 0)
        paper.rotation.set(0.2, 0.3, 0.1)
        scene.add(paper)
        objects.push(paper)

        // Spiral shape
        const spiralCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.2, 0.2, 0),
            new THREE.Vector3(0.4, 0.4, 0),
            new THREE.Vector3(0.6, 0.6, 0),
            new THREE.Vector3(0.8, 0.8, 0),
            new THREE.Vector3(1, 1, 0),
        ])

        const spiralGeometry = new THREE.TubeGeometry(spiralCurve, 64, 0.05, 8, false)
        const spiralMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
            metalness: 0.8,
            roughness: 0.2,
        })

        const spiral = new THREE.Mesh(spiralGeometry, spiralMaterial)
        spiral.position.set(posMultiplier * 1.5, -1, 0)
        spiral.rotation.set(0.5, 0.5, 0)
        scene.add(spiral)
        objects.push(spiral)

        // Sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            metalness: 0.5,
            roughness: 0.2,
        })

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(posMultiplier * 1, -1.5, 0)
        scene.add(sphere)
        objects.push(sphere)

        // Torus
        const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 32)
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
            metalness: 0.8,
            roughness: 0.2,
        })

        const torus = new THREE.Mesh(torusGeometry, torusMaterial)
        torus.position.set(posMultiplier * 2, 1.5, 0)
        scene.add(torus)
        objects.push(torus)

        // Animation
        function animate() {
            requestAnimationFrame(animate)

            objects.forEach((obj, i) => {
                // Gentle floating motion
                obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
                obj.position.x += Math.cos(Date.now() * 0.001 + i) * 0.001 * posMultiplier

                // Slow rotation
                obj.rotation.x += 0.001
                obj.rotation.y += 0.002
            })

            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return

            camera.aspect = window.innerWidth / 4 / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth / 4, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement)
            }
            window.removeEventListener("resize", handleResize)
        }
    }, [position])

    return <div ref={containerRef} className="h-full w-full opacity-70" />
}
