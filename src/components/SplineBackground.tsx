const SplineBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <iframe
        src="https://my.spline.design/cybernetichuman-vhF5NJ0QB0qooL67POeaoKl0/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          pointerEvents: "none",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "calc(100% + 80px)",
        }}
        title="Cybernetic Human 3D"
        loading="lazy"
        allow="autoplay"
      />
      {/* Hide the Spline watermark */}
      <div
        className="absolute bottom-0 right-0 w-[200px] h-[50px] bg-background"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default SplineBackground;
