/* ============================================================
   careers.js — Careers page: jobs data, modal, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     JOBS DATA
  ---------------------------------------------------------- */
  var JOBS = [
    {
      id: 1,
      title: 'Senior FinOps Engineer',
      dept: 'Engineering',
      type: 'Full-Time',
      level: 'Entry Level',
      location: 'Remote',
      exp: '3+ Years',
      posted: '12 days ago',
      about: 'We are looking for a skilled and detail-oriented Senior FinOps Engineer to help optimize cloud infrastructure costs, improve financial visibility, and support scalable cloud operations. You will work closely with engineering, DevOps, and finance teams to ensure efficient cloud resource management while maintaining high system performance and reliability.',
      responsibilities: [
        'Monitor, analyze, and optimize cloud infrastructure costs across AWS, Azure, or GCP.',
        'Collaborate with engineering teams to implement cost-efficient cloud architectures.',
        'Build dashboards and reports for cloud usage, budgeting, and forecasting.',
        'Identify underutilized resources and recommend optimization strategies.',
        'Implement tagging, governance, and cost allocation best practices.',
        'Support automation initiatives related to cloud cost management.',
        'Work with cross-functional teams to improve operational efficiency and financial accountability.',
        'Stay updated with cloud pricing models and FinOps best practices.'
      ],
      skills: [
        '3+ years of experience in FinOps, Cloud Operations, DevOps, or Infrastructure Engineering.',
        'Strong understanding of cloud platforms such as AWS, Azure, or Google Cloud.',
        'Experience with cloud cost optimization and monitoring tools.',
        'Familiarity with CI/CD pipelines and infrastructure automation.',
        'Knowledge of budgeting, forecasting, and financial reporting concepts.',
        'Strong analytical and problem-solving skills.',
        'Excellent communication and collaboration abilities.'
      ],
      preferred: [
        'FinOps Certified Practitioner certification.',
        'Experience with Kubernetes, Terraform, or Infrastructure as Code tools.',
        'Understanding of security and governance best practices in cloud environments.'
      ],
      whyJoin: [
        'Work on innovative and impactful technology solutions.',
        'Collaborative and growth-oriented work culture.',
        'Opportunities for continuous learning and career development.',
        'Flexible and remote-friendly work environment.'
      ]
    },
    {
      id: 2,
      title: 'Embedded Firmware Engineer',
      dept: 'Engineering',
      type: 'Full-Time',
      level: 'Mid Level',
      location: 'Hyderabad, India',
      exp: '2–5 Years',
      posted: '8 days ago',
      about: 'We are seeking an Embedded Firmware Engineer with hands-on experience developing low-level firmware for microcontrollers and embedded systems. You will work on exciting industrial IoT products from design through to production.',
      responsibilities: [
        'Design and develop firmware for ARM Cortex-M and RISC-V microcontrollers.',
        'Write and maintain bare-metal and RTOS-based firmware (FreeRTOS, Zephyr).',
        'Collaborate with hardware engineers on bring-up, debugging, and validation.',
        'Implement communication protocols: UART, SPI, I2C, CAN, Modbus, MQTT.',
        'Optimize firmware for power consumption, memory, and performance.',
        'Develop automated test frameworks and CI/CD pipelines for firmware.',
        'Write clear technical documentation.'
      ],
      skills: [
        'Proficiency in C/C++ for embedded systems.',
        'Experience with RTOS: FreeRTOS, Zephyr, or equivalent.',
        'Strong knowledge of communication protocols (UART, SPI, I2C, CAN).',
        'Familiarity with debuggers: JTAG, SWD, GDB.',
        'Experience with oscilloscopes, logic analyzers, and multimeters.',
        'Ability to read and understand hardware schematics.'
      ],
      preferred: [
        'Experience with wireless protocols: BLE, Wi-Fi, LoRa, Zigbee.',
        'Knowledge of bootloaders and OTA firmware update mechanisms.',
        'Experience with industrial safety standards.'
      ],
      whyJoin: [
        'Work on cutting-edge industrial IoT and embedded products.',
        'Mentorship from experienced engineers and a collaborative culture.',
        'Competitive compensation and flexible work arrangements.',
        'Opportunity to see your work deployed in real industrial environments.'
      ]
    },
    {
      id: 3,
      title: 'IoT Solutions Developer',
      dept: 'Engineering',
      type: 'Full-Time',
      level: 'Mid Level',
      location: 'Remote',
      exp: '2–4 Years',
      posted: '15 days ago',
      about: 'We are looking for a talented IoT Solutions Developer to design, build, and deploy end-to-end IoT solutions. You will bridge hardware and cloud, enabling real-time data from edge devices to business intelligence dashboards.',
      responsibilities: [
        'Develop and deploy IoT solutions on cloud platforms (AWS IoT, Azure IoT Hub, GCP IoT).',
        'Build scalable backend services and APIs for device management.',
        'Implement real-time data pipelines and analytics dashboards.',
        'Work with MQTT, CoAP, and HTTP protocols for device communication.',
        'Design and implement security models for connected devices.',
        'Collaborate with hardware teams on connectivity integration.',
        'Monitor and optimize deployed IoT infrastructure.'
      ],
      skills: [
        'Proficiency in Python, Node.js, or similar backend technologies.',
        'Experience with cloud IoT platforms (AWS IoT, Azure IoT Hub).',
        'Knowledge of MQTT, CoAP, REST API design.',
        'Familiarity with time-series databases (InfluxDB, TimescaleDB).',
        'Understanding of network protocols and security.',
        'Experience with containerization (Docker, Kubernetes).'
      ],
      preferred: [
        'Experience with edge computing frameworks.',
        'Knowledge of ML at the edge (TensorFlow Lite, ONNX).',
        'Experience with industrial protocols (Modbus, OPC-UA).'
      ],
      whyJoin: [
        'Shape the future of industrial IoT at a fast-growing company.',
        'Full ownership of projects from architecture to deployment.',
        'Continuous learning budget and conference sponsorship.',
        'Work with a highly skilled cross-functional team.'
      ]
    },
    {
      id: 4,
      title: 'Hardware Design Engineer',
      dept: 'Hardware',
      type: 'Full-Time',
      level: 'Mid Level',
      location: 'Hyderabad, India',
      exp: '3–6 Years',
      posted: '20 days ago',
      about: 'Join our hardware team to design and develop complex PCBs and electronic systems for industrial-grade embedded products. You will take designs from schematic to production-ready boards, working alongside firmware and mechanical teams.',
      responsibilities: [
        'Design schematics and PCB layouts using Altium Designer or KiCad.',
        'Select components and manage BOM for cost and availability optimization.',
        'Collaborate with firmware team for hardware bring-up and validation.',
        'Perform design reviews, signal integrity analysis, and EMI/EMC compliance.',
        'Coordinate with manufacturers for PCB fabrication and assembly.',
        'Conduct hardware testing, debugging, and failure analysis.',
        'Develop hardware documentation: schematics, BOM, assembly drawings.'
      ],
      skills: [
        'Proficiency in Altium Designer, KiCad, or Eagle.',
        'Strong knowledge of analog and digital circuit design.',
        'Experience with mixed-signal PCB design and high-speed layout.',
        'Understanding of power electronics: buck/boost converters, LDOs.',
        'Familiarity with EMC/EMI design principles.',
        'Experience with oscilloscopes, spectrum analyzers, and lab equipment.'
      ],
      preferred: [
        'Experience with industrial communication hardware (RS-485, CAN, Ethernet).',
        'Knowledge of functional safety standards (IEC 61508, ISO 26262).',
        'Experience with SPICE simulation tools.'
      ],
      whyJoin: [
        'Work on diverse hardware projects across IoT, industrial, and consumer electronics.',
        'Access to a well-equipped hardware lab and prototyping tools.',
        'Collaborative team culture with direct impact on product quality.',
        'Growth path into technical lead and principal engineer roles.'
      ]
    },
    {
      id: 5,
      title: 'Business Development Manager',
      dept: 'Sales & Business',
      type: 'Full-Time',
      level: 'Mid–Senior Level',
      location: 'Remote / Hybrid',
      exp: '4+ Years',
      posted: '5 days ago',
      about: 'We are looking for a driven Business Development Manager to expand eLT Edge\'s client base in the embedded systems, IoT, and industrial technology sectors. You will build relationships with potential clients, understand their technology needs, and position our engineering services as the ideal solution.',
      responsibilities: [
        'Identify and pursue new business opportunities in embedded systems and IoT markets.',
        'Build and maintain relationships with decision-makers at target companies.',
        'Lead discovery calls, prepare proposals, and negotiate contracts.',
        'Collaborate with the engineering team to craft solution presentations.',
        'Develop and execute go-to-market strategies for new verticals.',
        'Maintain a healthy pipeline using CRM tools.',
        'Represent eLT Edge at industry events and conferences.'
      ],
      skills: [
        '4+ years of B2B sales or business development in tech/engineering.',
        'Strong understanding of embedded systems, IoT, or hardware services.',
        'Excellent communication, negotiation, and presentation skills.',
        'Experience with CRM tools (Salesforce, HubSpot).',
        'Ability to translate technical concepts into business value.',
        'Proven track record of meeting revenue targets.'
      ],
      preferred: [
        'Network within the industrial technology or manufacturing sector.',
        'Experience selling engineering services or custom product development.',
        'Background in technical sales with engineering qualifications.'
      ],
      whyJoin: [
        'High-impact role with direct influence on company growth.',
        'Competitive base salary plus performance-based incentives.',
        'Flexible remote working environment.',
        'Work closely with a passionate engineering team on meaningful products.'
      ]
    }
  ];

  /* Sync job titles to localStorage so contact.html can read them */
  try {
    localStorage.setItem('eltEdgeJobs', JSON.stringify(
      JOBS.map(function (j) { return j.title; })
    ));
  } catch (e) {}

  /* ----------------------------------------------------------
     RENDER JOB CARDS
  ---------------------------------------------------------- */
  var jobList = document.getElementById('jobCardsList');
  if (jobList) {
    JOBS.forEach(function (job) {
      var card = document.createElement('div');
      card.className = 'job-card reveal';
      card.innerHTML =
        '<div class="job-card-left">' +
          '<div class="job-card-dept">' + esc(job.dept) + '</div>' +
          '<div class="job-card-title">' + esc(job.title) + '</div>' +
          '<div class="job-tags">' +
            '<span class="job-tag">' + esc(job.level) + '</span>' +
            '<span class="job-tag">' + esc(job.type) + '</span>' +
            '<span class="job-tag">' + esc(job.location) + '</span>' +
          '</div>' +
          '<div class="job-posted">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
            'Posted ' + esc(job.posted) +
          '</div>' +
        '</div>' +
        '<button class="btn-apply" data-job-id="' + job.id + '">Apply Now</button>';
      jobList.appendChild(card);
    });

    jobList.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-apply');
      if (btn) openModal(parseInt(btn.dataset.jobId, 10));
    });
  }

  /* ----------------------------------------------------------
     MODAL
  ---------------------------------------------------------- */
  var overlay      = document.getElementById('jobModal');
  var modalTitle   = document.getElementById('modalJobTitle');
  var modalMeta    = document.getElementById('modalMeta');
  var modalAbout   = document.getElementById('modalAbout');
  var modalResp    = document.getElementById('modalResp');
  var modalSkills  = document.getElementById('modalSkills');
  var modalPref    = document.getElementById('modalPreferred');
  var modalWhy     = document.getElementById('modalWhyJoin');
  var applyBtn     = document.getElementById('modalApplyBtn');

  function openModal(jobId) {
    var job = JOBS.filter(function (j) { return j.id === jobId; })[0];
    if (!job || !overlay) return;

    if (modalTitle) modalTitle.textContent = job.title;
    if (modalMeta) {
      modalMeta.innerHTML =
        '<span class="modal-meta-item"><strong>Department:</strong> ' + esc(job.dept) + '</span>' +
        '<span class="modal-meta-item"><strong>Job Type:</strong> ' + esc(job.type) + '</span>' +
        '<span class="modal-meta-item"><strong>Location:</strong> ' + esc(job.location) + '</span>' +
        '<span class="modal-meta-item"><strong>Experience:</strong> ' + esc(job.exp) + '</span>';
    }
    if (modalAbout)  fillParagraph(modalAbout, job.about);
    if (modalResp)   fillList(modalResp, job.responsibilities);
    if (modalSkills) fillList(modalSkills, job.skills);
    if (modalPref)   fillList(modalPref, job.preferred);
    if (modalWhy)    fillList(modalWhy, job.whyJoin);
    if (applyBtn)    applyBtn.dataset.role = job.title;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var dialog = overlay.querySelector('.modal-dialog');
    if (dialog) dialog.scrollTop = 0;
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  var closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', function () {
      var role = applyBtn.dataset.role || '';
      window.location.href = 'contact.html?tab=career&role=' + encodeURIComponent(role);
    });
  }

  /* ----------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fillParagraph(section, text) {
    var p = section.querySelector('p');
    if (p) p.textContent = text;
  }

  function fillList(section, items) {
    var ul = section.querySelector('ul');
    if (!ul) return;
    ul.innerHTML = '';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  }

  initReveal();

})();
