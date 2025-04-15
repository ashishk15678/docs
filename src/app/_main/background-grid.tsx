"use client"

import { useEffect, useRef } from "react"

export function BackgroundGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            ctx.scale(dpr, dpr)
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            drawGrid()
        }

        const drawGrid = () => {
            if (!ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
            gradient.addColorStop(0, "rgba(249, 250, 251, 0.8)")
            gradient.addColorStop(1, "rgba(243, 244, 246, 0.8)")
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

            const gridSize = 40
            const width = window.innerWidth
            const height = window.innerHeight

            // Draw grid lines
            ctx.strokeStyle = "rgba(230, 230, 230, 0.7)"
            ctx.lineWidth = 0.5

            // Draw vertical lines
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }

            // Draw horizontal lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            // Draw dots at intersections
            ctx.fillStyle = "rgba(200, 200, 200, 0.8)"
            for (let x = 0; x <= width; x += gridSize) {
                for (let y = 0; y <= height; y += gridSize) {
                    ctx.beginPath()
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            // Add some accent dots
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width
                const y = Math.random() * height
                const size = Math.random() * 4 + 2
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: "none" }} />
}
