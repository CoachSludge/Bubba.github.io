
    document.addEventListener("DOMContentLoaded", function () {
      const rootStyles = getComputedStyle(document.documentElement);
      // Get custom color values from CSS variables
      const colorStr = rootStyles.getPropertyValue('--vanta-globe-color').trim();
      const color2Str = rootStyles.getPropertyValue('--vanta-globe-color2').trim();
      const bgColorStr = rootStyles.getPropertyValue('--vanta-globe-bg-color').trim();

      // Convert the hex strings to numbers that VANTA expects
      const globeColor = parseInt("0x" + colorStr.replace("#", ""));
      const globeColor2 = parseInt("0x" + color2Str.replace("#", ""));
      const globeBgColor = parseInt("0x" + bgColorStr.replace("#", ""));

      VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: globeColor,
        color2: globeColor2,
        backgroundColor: globeBgColor
      });
    });