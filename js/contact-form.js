/* ============================================================
   eLT Edge — Contact Form & Google Sheets Integration
   Handles dynamic form submissions for Service, Partnership, Career, & Solution forms.
   Submits details to Google Sheets Web App or Sheet API Endpoint.
   ============================================================ */

(function () {
  "use strict";

  // ============================================================
  // CONFIGURATION: Set your Google Sheet Web App URL or API Endpoint
  // ============================================================
  window.GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzrXKDnwIt4qDxtnO_QapB4ZqOunywJBySGjZM-7X2qnfIJvlW1Zn13Rw8-eSsSaM_FZA/exec";

  document.addEventListener("DOMContentLoaded", function () {
    initFormHandlers();
  });

  /* ----------------------------------------------------------
     DYNAMIC FORM SUBMISSION HANDLERS
  ---------------------------------------------------------- */
  function initFormHandlers() {
    var forms = document.querySelectorAll(".c-form");

    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        handleFormSubmit(form);
      });
    });
  }

  async function handleFormSubmit(form) {
    var submitBtn = form.querySelector(".c-btn-submit");
    var btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    var btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
    var feedbackDiv = form.querySelector(".c-form-feedback");

    // Helper to show alert inside form
    function showAlert(type, message) {
      if (!feedbackDiv) return;
      var icon = type === "success" 
        ? '<svg class="c-form-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg class="c-form-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

      feedbackDiv.className = "c-form-feedback c-form-alert " + type;
      feedbackDiv.innerHTML = icon + '<div>' + message + '</div>';
      feedbackDiv.style.display = "flex";
    }

    // Helper to toggle button loading state
    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      if (btnSpinner) btnSpinner.style.display = isLoading ? "inline-block" : "none";
      if (btnText) {
        if (isLoading) {
          if (!btnText.dataset.originalText) btnText.dataset.originalText = btnText.textContent;
          btnText.textContent = "Submitting...";
        } else {
          if (btnText.dataset.originalText) btnText.textContent = btnText.dataset.originalText;
        }
      }
    }

    // Hide previous alert
    if (feedbackDiv) {
      feedbackDiv.style.display = "none";
      feedbackDiv.innerHTML = "";
    }

    // Collect data from form controls
    var formData = new FormData(form);
    var payload = {};

    formData.forEach(function (value, key) {
      if (key && value !== "") {
        payload[key] = value;
      }
    });

    // Check form panel ID to assign specific formType
    var parentPanel = form.closest(".c-panel");
    var panelId = parentPanel ? parentPanel.id : "";

    if (panelId === "panel-service") {
      payload.formType = "services";
      var serviceSelect = form.querySelector("select[name='service']");
      if (serviceSelect && serviceSelect.value) payload.service = serviceSelect.value;
      var serviceMsg = form.querySelector("textarea[name='message']");
      if (serviceMsg && serviceMsg.value) payload.message = serviceMsg.value;
    } else if (panelId === "panel-partnership") {
      payload.formType = "partnership";
      var partMsg = form.querySelector("textarea[name='message']");
      if (partMsg && partMsg.value) payload.message = partMsg.value;
    } else if (panelId === "panel-career") {
      payload.formType = "carrer";
      var roleSelect = form.querySelector("select[name='role']");
      if (roleSelect && roleSelect.value) payload.role = roleSelect.value;
      var driveInput = document.getElementById("resumeLinkInput");
      if (driveInput && driveInput.value) payload.resumeLink = driveInput.value.trim();
      var relExpCheck = document.getElementById("relevantExperience");
      payload.relevantExperience = relExpCheck ? (relExpCheck.checked ? "Not Relevant" : "Relevant") : "Relevant";
    } else if (panelId === "panel-solution") {
      payload.formType = "solution";
      var selectedSolutions = [];
      form.querySelectorAll(".c-field:nth-of-type(3) .c-chip.selected span").forEach(function (el) {
        selectedSolutions.push(el.textContent.trim());
      });
      if (selectedSolutions.length) payload.solutions = selectedSolutions.join(", ");

      var userTypes = [];
      form.querySelectorAll(".c-field:nth-of-type(4) .c-chip.selected span").forEach(function (el) {
        userTypes.push(el.textContent.trim());
      });
      if (userTypes.length) payload.user_type = userTypes.join(", ");

      var solMsg = form.querySelector("textarea[name='message']");
      if (solMsg && solMsg.value) payload.message = solMsg.value;
    }

    // Combine Phone Number if split
    var phoneSelect = form.querySelector(".c-phone-code");
    var phoneInput = form.querySelector(".c-phone-num") || form.querySelector("input[name='phone']");
    if (phoneInput && phoneInput.value) {
      payload.phone = (phoneSelect ? phoneSelect.value : "") + " " + phoneInput.value;
    }

    if (!payload.name) {
      showAlert("error", "Please enter your name.");
      return;
    }

    if (!payload.email) {
      showAlert("error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    var endpoint = window.GOOGLE_SHEETS_ENDPOINT;

    // Demo mode if endpoint is not set yet
    if (!endpoint) {
      setTimeout(function () {
        setLoading(false);
        showAlert(
          "success",
          "<strong>Form Submitted Successfully!</strong><br/><small>Please set <code>window.GOOGLE_SHEETS_ENDPOINT</code> in <code>js/contact-form.js</code> to link your Google Sheet.</small>"
        );
        form.reset();
        resetFormState(form);
      }, 800);
      return;
    }

    try {
      // Build search params for Google Apps Script / Sheet API POST
      var params = new URLSearchParams();
      for (var k in payload) {
        if (payload.hasOwnProperty(k) && payload[k] !== undefined && payload[k] !== null) {
          params.append(k, payload[k]);
        }
      }

      // Submit natively via hidden iframe (1 single execution to prevent duplicate rows)
      submitViaIframe(endpoint, payload);

      setTimeout(function () {
        setLoading(false);
        showAlert(
          "success",
          "<strong>Form Submitted!</strong> Your details have been submitted successfully."
        );
        form.reset();
        resetFormState(form);
      }, 1000);

    } catch (err) {
      setLoading(false);
      showAlert("error", "Unable to submit form. Please check your network connection.");
    }
  }

  function submitViaIframe(actionUrl, payload) {
    var iframe = document.getElementById("gscript_hidden_iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "gscript_hidden_iframe";
      iframe.name = "gscript_hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    var tempForm = document.createElement("form");
    tempForm.action = actionUrl;
    tempForm.method = "POST";
    tempForm.target = "gscript_hidden_iframe";
    tempForm.style.display = "none";

    for (var k in payload) {
      if (payload.hasOwnProperty(k) && payload[k] !== undefined && payload[k] !== null) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = payload[k];
        tempForm.appendChild(input);
      }
    }

    document.body.appendChild(tempForm);
    tempForm.submit();
    setTimeout(function () {
      if (tempForm.parentNode) {
        tempForm.parentNode.removeChild(tempForm);
      }
    }, 1500);
  }

  function resetFormState(form) {
    form.querySelectorAll(".c-chip").forEach(function (c) {
      c.classList.remove("selected");
    });
    var fileText = form.querySelector(".c-file-text");
    if (fileText) fileText.textContent = "Choose File (.pdf, .doc, .docx)";
  }

})();
