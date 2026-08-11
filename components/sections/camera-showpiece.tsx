import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";
import { SafetyPanel } from "@/components/vignettes/safety-panel";

/**
 * The showpiece: full-bleed cinematic band (Anduril reference), composed
 * product-first — the ZenCam Plus render is the hero of the section and the
 * telemetry hugs it, rather than the two competing at equal weight.
 */
export function CameraShowpiece() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-28">
      <TopoTexture opacity={0.7} />

      <Container className="relative">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-display text-display font-semibold text-dfg">
            Every risky mile becomes a coaching clip
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-dmuted">
            ZenCam Plus watches the road, and the AI reads the risk. The moment
            a harsh brake or a drifting gaze happens, the clip is already in
            the coach's queue.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] lg:gap-14"
        >
          {/* The product, large — official ZenCam Plus render from zenduit.com */}
          <div>
            <img
              src="/zencam-plus.webp"
              alt="ZenCam Plus AI dash camera"
              className="mx-auto block w-full max-w-[660px] drop-shadow-[0_48px_72px_rgb(2_6_18/0.8)]"
            />
          </div>

          <SafetyPanel />
        </Reveal>
      </Container>
    </section>
  );
}
