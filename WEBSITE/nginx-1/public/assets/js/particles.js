document.addEventListener("DOMContentLoaded", function () {
  const rootStyles = getComputedStyle(document.documentElement);
  const particleColor = rootStyles.getPropertyValue('--particle-color').trim() || '#d00d9e';
  const particleOpacity = parseFloat(rootStyles.getPropertyValue('--particle-opacity').trim()) || 0.2;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: particleColor
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: particleOpacity,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: particleColor,
        opacity: particleOpacity,
        width: 10
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
});
