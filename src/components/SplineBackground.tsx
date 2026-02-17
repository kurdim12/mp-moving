import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SplineBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/vhF5NJ0QB0qooL67POeaoKl0/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
};

export default SplineBackground;
