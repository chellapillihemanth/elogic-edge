/* ============================================================
   capabilities.js — Tab switching & dynamic content rendering
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     DATA — one entry per capability tab
  ---------------------------------------------------------- */
  var capabilities = [
    {
      index: 0,
      label: 'Embedded Hardware Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities1.png',
      desc: 'End-to-end embedded hardware design, delivering scalable, high-performance systems ready for real-world deployment.',
      viewDesc: 'End-to-end embedded hardware development covering architecture, circuit design, PCB layout, prototyping, and validation for reliable electronic products.',
      cards: [
        {
          title: 'Architecture & System Design',
          body: 'System architecture & block diagrams, power & performance optimization, interface & protocol planning, memory & data flow design, reliability-focused engineering.'
        },
        {
          title: 'Prototyping & Validation',
          body: 'Functional testing & verification, signal & power integrity analysis, thermal testing, EMC pre-compliance testing, environmental testing support.'
        },
        {
          title: 'PCB Design',
          body: 'Multi-layer PCB layout, high-speed routing, thermal & power optimization, manufacturing-ready layouts, impedance-controlled design.'
        },
        {
          title: 'Circuit Design & Implementation',
          body: 'Analog & sensor interface design, high-speed digital communication (SPI, I2C, UART, USB, Ethernet), power management circuits, signal filtering & conditioning, EMI/EMC optimization, mixed-signal design.'
        }
      ]
    },
    {
      index: 1,
      label: 'Embedded Software Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities2.png',
      desc: 'Full-stack firmware and embedded software solutions, from bare-metal to RTOS-based applications.',
      viewDesc: 'Comprehensive embedded software development covering firmware architecture, RTOS integration, driver development, and field deployment for robust connected products.',
      cards: [
        {
          title: 'Firmware Architecture',
          body: 'Bare-metal & RTOS firmware design, bootloader development, memory management, interrupt handling, low-power state machine design.'
        },
        {
          title: 'Driver & BSP Development',
          body: 'Custom peripheral drivers, HAL abstraction layers, board support packages, sensor & actuator integration, protocol stack implementation.'
        },
        {
          title: 'Middleware & Stack Integration',
          body: 'Communication stacks (BLE, Wi-Fi, LTE, CAN, Modbus), OTA update frameworks, data logging, file systems, cloud connectivity.'
        },
        {
          title: 'Testing & Validation',
          body: 'Unit & integration testing, hardware-in-the-loop testing, code coverage analysis, static analysis, functional safety compliance support.'
        }
      ]
    },
    {
      index: 2,
      label: 'Interface System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities3.png',
      desc: 'Designing intuitive human-machine interfaces and seamless system communication layers.',
      viewDesc: 'End-to-end interface design — from HMI touchscreens to protocol bridges — ensuring seamless communication between subsystems and end users.',
      cards: [
        {
          title: 'HMI & Display Integration',
          body: 'Touchscreen UI design, embedded graphics frameworks (LVGL, Qt), display controller integration, multi-language support, accessibility compliance.'
        },
        {
          title: 'Protocol Bridge Design',
          body: 'UART/SPI/I2C to Ethernet bridges, CAN-to-USB converters, fieldbus gateways, custom protocol translation layers.'
        },
        {
          title: 'UI/UX for Embedded Systems',
          body: 'Workflow-driven interface design, color & font standards, iconography systems, low-latency rendering, energy-efficient display management.'
        },
        {
          title: 'Industrial Interface Standards',
          body: 'Modbus RTU/TCP, Profibus, EtherCAT integration, industrial panel design, EMI-hardened interface circuitry.'
        }
      ]
    },
    {
      index: 3,
      label: 'Wireless System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities4.png',
      desc: 'End-to-end wireless connectivity solutions for IoT, industrial, and consumer embedded products.',
      viewDesc: 'RF system design and wireless protocol integration for reliable, low-power, long-range communication in embedded and IoT devices.',
      cards: [
        {
          title: 'RF & Antenna Design',
          body: 'Antenna matching networks, PCB antenna layout, RF front-end design, link budget analysis, co-existence optimization.'
        },
        {
          title: 'Protocol Implementation',
          body: 'BLE 5.x, Wi-Fi 6, Zigbee, LoRa/LoRaWAN, LTE-M, NB-IoT, Thread — stack integration and certification support.'
        },
        {
          title: 'Wireless Security',
          body: 'TLS/DTLS encryption, certificate provisioning, secure key storage, device attestation, OTA firmware signing.'
        },
        {
          title: 'Range & Power Optimization',
          body: 'Duty-cycle tuning, sleep-mode scheduling, adaptive TX power, mesh topology design, interference mitigation.'
        }
      ]
    },
    {
      index: 4,
      label: 'Mechanical System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities5.png',
      desc: 'Precision mechanical engineering for enclosures, thermal management, and ruggedized product design.',
      viewDesc: 'Mechanical design and prototyping services — from concept sketches to production-ready enclosures — ensuring structural integrity and manufacturability.',
      cards: [
        {
          title: 'Enclosure & Industrial Design',
          body: '3D CAD modeling, DFM reviews, IP-rated enclosure design, material selection, surface finish specifications, ergonomic form factors.'
        },
        {
          title: 'Thermal Management',
          body: 'Thermal simulations, heat-sink design, forced & passive cooling, TIM selection, PCB thermal interface planning.'
        },
        {
          title: 'Structural & Vibration Analysis',
          body: 'FEA-based stress analysis, drop & shock simulation, vibration profile testing, tolerance stack-up analysis.'
        },
        {
          title: 'Prototyping & Tooling',
          body: 'Rapid prototyping (FDM, SLA, SLS), soft tooling, pre-production validation, production-ready mold design.'
        }
      ]
    },
    {
      index: 5,
      label: 'Manufacturing System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities6.png',
      desc: 'Optimized manufacturing processes for high-quality, cost-effective embedded product production.',
      viewDesc: 'Full manufacturing engineering support — from design-for-manufacturability reviews to production line setup — ensuring consistent quality at scale.',
      cards: [
        {
          title: 'DFM & DFT Reviews',
          body: 'Design-for-manufacturability analysis, test point placement, panelization strategy, solder paste stencil design, BOM cost optimization.'
        },
        {
          title: 'SMT & Assembly',
          body: 'SMT line setup, reflow profile optimization, selective soldering, THT assembly, conformal coating, potting & encapsulation.'
        },
        {
          title: 'Test & Inspection',
          body: 'ICT fixture design, flying probe testing, AOI & X-ray inspection, functional end-of-line testing, traceability systems.'
        },
        {
          title: 'Supply Chain & NPI',
          body: 'Component sourcing strategy, AVL management, NPI process planning, ramp-rate optimization, production yield analysis.'
        }
      ]
    },
    {
      index: 6,
      label: 'IoT System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities7.png',
      desc: 'Scalable IoT platforms connecting edge devices to cloud dashboards with security and reliability.',
      viewDesc: 'Complete IoT ecosystem development — edge hardware, gateway firmware, cloud backend, and analytics dashboards — built for industrial and consumer deployments.',
      cards: [
        {
          title: 'Edge Node Design',
          body: 'Low-power sensor nodes, multi-protocol gateways, edge AI inference, local data buffering, fleet management support.'
        },
        {
          title: 'Connectivity & Cloud',
          body: 'MQTT/AMQP brokers, AWS IoT / Azure IoT Hub integration, device shadow, telemetry pipelines, time-series databases.'
        },
        {
          title: 'IoT Security',
          body: 'Secure boot, device identity management, PKI infrastructure, encrypted OTA, anomaly detection, zero-trust architecture.'
        },
        {
          title: 'Dashboard & Analytics',
          body: 'Real-time monitoring dashboards, KPI visualization, alerting & notification pipelines, predictive maintenance models, data export APIs.'
        }
      ]
    },
    {
      index: 7,
      label: 'Technology System Design',
      icon: 'assets/images/Our Capabilities/Our Capabilities8.png',
      desc: 'Strategic technology consulting and system integration for complex multi-domain product programs.',
      viewDesc: 'Technology architecture and consulting services that align business goals with engineering execution — from feasibility studies to system integration and program management.',
      cards: [
        {
          title: 'Technology Roadmapping',
          body: 'Feasibility studies, technology selection, build-vs-buy analysis, IP landscape review, risk & compliance assessment.'
        },
        {
          title: 'System Integration',
          body: 'Multi-vendor integration, hardware-software co-design, interoperability testing, migration planning, legacy system modernization.'
        },
        {
          title: 'Architecture Consulting',
          body: 'Reference architecture definition, scalability planning, platform reuse strategy, modular design frameworks, standards alignment.'
        },
        {
          title: 'Program Management',
          body: 'Technical program management, milestone tracking, cross-functional coordination, risk mitigation, supplier qualification.'
        }
      ]
    }
  ];

  /* ----------------------------------------------------------
     DOM REFERENCES
  ---------------------------------------------------------- */
  var tabs = Array.from(document.querySelectorAll('.cap-tab'));
  var capContent = document.getElementById('capContent');
  var capContentInner = capContent ? capContent.querySelector('.cap-content-inner') : null;
  var capViewDesc = document.getElementById('capViewDesc');
  var capCardsGrid = document.getElementById('capCardsGrid');

  if (!tabs.length || !capContentInner) return;

  var activeIndex = 0;
  var isAnimating = false;

  /* ----------------------------------------------------------
     RENDER CARDS for given capability data
  ---------------------------------------------------------- */
  function renderCards(data) {
    capCardsGrid.innerHTML = '';
    data.cards.forEach(function (card) {
      var el = document.createElement('div');
      el.className = 'glass-card';
      el.innerHTML =
        '<h4 class="glass-card-title">' + card.title + '</h4>' +
        '<p class="glass-card-body">' + card.body + '</p>';
      capCardsGrid.appendChild(el);
    });
  }

  /* ----------------------------------------------------------
     ACTIVATE a tab by index
  ---------------------------------------------------------- */
  function activateTab(index) {
    if (index === activeIndex || isAnimating) return;
    isAnimating = true;
    activeIndex = index;

    var data = capabilities[index];

    /* Update tab UI */
    tabs.forEach(function (tab, i) {
      var isActive = i === index;
      var wasActive = tab.classList.contains('cap-tab--active');
      tab.classList.toggle('cap-tab--active', isActive);

      if (isActive && !wasActive) {
        /* Inject icon and desc into newly activated tab */
        var d = capabilities[i];
        var existingIcon = tab.querySelector('.cap-tab-icon');
        if (!existingIcon) {
          var iconEl = document.createElement('div');
          iconEl.className = 'cap-tab-icon';
          iconEl.innerHTML = '<img src="' + d.icon + '" alt="' + d.label + '" />';
          tab.insertBefore(iconEl, tab.firstChild);
        }
        var existingDesc = tab.querySelector('.cap-tab-desc');
        if (!existingDesc) {
          var descEl = document.createElement('p');
          descEl.className = 'cap-tab-desc';
          descEl.textContent = d.desc;
          tab.appendChild(descEl);
        }
      } else if (!isActive && wasActive) {
        /* Remove injected icon/desc from deactivated tab (keeps DOM clean) */
        var oldIcon = tab.querySelector('.cap-tab-icon');
        var oldDesc = tab.querySelector('.cap-tab-desc');
        if (oldIcon) oldIcon.remove();
        if (oldDesc) oldDesc.remove();
      }
    });

    /* Fade out content */
    capContentInner.classList.add('fade-out');

    setTimeout(function () {
      /* Update content text */
      capViewDesc.textContent = data.viewDesc;
      renderCards(data);

      /* Fade in */
      capContentInner.classList.remove('fade-out');
      capContentInner.classList.add('fade-in');

      setTimeout(function () {
        capContentInner.classList.remove('fade-in');
        isAnimating = false;
      }, 320);
    }, 200);
  }

  /* ----------------------------------------------------------
     BIND CLICK & KEYBOARD to tabs
  ---------------------------------------------------------- */
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      activateTab(i);
    });

    tab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(i);
      }
    });
  });

  /* ----------------------------------------------------------
     INIT — render first tab's content
  ---------------------------------------------------------- */
  (function init() {
    renderCards(capabilities[0]);
    capContentInner.classList.add('fade-in');
    setTimeout(function () {
      capContentInner.classList.remove('fade-in');
    }, 400);
  })();

})();
