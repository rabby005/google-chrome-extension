/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Global variables to track intervals and last date strings
let analogIntervalId = null;
let digitalIntervalId = null;
let lastDateString = null;
let lastDigitalDateString = null;
let lastGreetingString = null;

// ---------------------- Hiding clock func ----------------------
// Select elements
const leftDiv = document.getElementById("leftDiv");
const rightDiv = document.getElementById("rightDiv");
const hideClockCheckbox = document.getElementById("hideClock");
const clockHidden = document.getElementById("clockHidden");
const clockOptions = document.querySelector(".clockOptions");

function toggleHideState(isHidden) {
    clockOptions.classList.toggle("not-applicable", isHidden);

    if (isHidden)
        setTimeout(() => clockHidden.style.borderBottom = "none", 120);
    else
        clockHidden.style.borderBottom = "";
}

function applyClockState(isHidden) {
    leftDiv.classList.toggle("clock-hidden-left", isHidden);
    rightDiv.classList.toggle("clock-shifted-right", isHidden);
    rightDiv.classList.toggle("clock-shifted-right-wide", !isHidden);
    rightDiv.classList.toggle("clock-padding-adjusted", isHidden);
}

function handleClockVisibility() {
    if (window.matchMedia("(max-width: 500px)").matches) {
        initializeClock();

        clockOptions.classList.remove("not-applicable");
        rightDiv.classList.remove("clock-padding-adjusted");
    }
    else {
        // Retrieve saved state from localStorage
        const isClockHidden = localStorage.getItem("hideClockVisible") === "true";
        hideClockCheckbox.checked = isClockHidden;

        // Apply initial state
        applyClockState(isClockHidden);
        toggleHideState(isClockHidden);

        if (!isClockHidden) {
            initializeClock();
        }

        hideClockCheckbox.addEventListener("change", function () {
            const isChecked = hideClockCheckbox.checked;
            localStorage.setItem("hideClockVisible", isChecked);
            applyClockState(isChecked);
            toggleHideState(isChecked);

            if (!isChecked) {
                initializeClock();
            }
        });
    }
}

handleClockVisibility();
// Update on window resize
window.addEventListener("resize", handleClockVisibility);

// ---------------------- Clock func ----------------------
async function initializeClock() {
    // Clear any existing intervals first
    if (analogIntervalId) {
        clearInterval(analogIntervalId);
        analogIntervalId = null;
    }
    if (digitalIntervalId) {
        clearInterval(digitalIntervalId);
        digitalIntervalId = null;
    }

    let clocktype;

    // Track cumulative rotations
    let cumulativeSecondRotation = 0;
    let cumulativeMinuteRotation = 0;
    let cumulativeHourRotation = 0;

    // Initialize on first load
    let isFirstLoad = true;

    // Retrieve current time and calculate initial angles
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();

    // Initialize cumulative rotations
    cumulativeSecondRotation = initialSeconds * 6;
    cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10);
    cumulativeHourRotation = (30 * initialHours + initialMinutes / 2);

    // Apply initial rotations (no need to wait 1s now)
    document.getElementById("second").style.transform = `translateX(-50%) rotate(${cumulativeSecondRotation}deg)`;
    document.getElementById("minute").style.transform = `translateX(-50%) rotate(${cumulativeMinuteRotation}deg)`;
    document.getElementById("hour").style.transform = `translateX(-50%) rotate(${cumulativeHourRotation}deg)`;

    function initializeClockType() {
        const savedClockType = localStorage.getItem("clocktype");
        clocktype = savedClockType ? savedClockType : "analog"; // Default to "analog" if nothing is saved
        localStorage.setItem("clocktype", clocktype); // Ensure it's set in local storage
    }

    // Call this function to initialize the clock type
    initializeClockType();

    function updateDate() {
        if (clocktype === "analog") {
            var currentTime = new Date();
            var dayOfWeek = currentTime.getDay();
            var dayOfMonth = currentTime.getDate();
            var month = currentTime.getMonth();

            // Define the current language
            const currentLanguage = getLanguageStatus("selectedLanguage") || "en";

            // Get the translated name of the day
            var dayName = translations[currentLanguage]?.days?.[dayOfWeek] ?? translations["en"].days[dayOfWeek];

            // Get the translated name of the month
            var monthName = translations[currentLanguage]?.months?.[month] ?? translations["en"].months[month];

            // Localize the day of the month
            var localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

            // DATE DISPLAY FOR ANALOG CLOCK
            const dateDisplay = {
                bn: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                mr: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                ne: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                zh: `${month + 1}月${dayOfMonth}日，${dayName}`,
                zh_TW: `${month + 1}月${dayOfMonth}日，${dayName}`,
                cs: `${dayName}, ${dayOfMonth}. ${monthName}`,
                hi: `${dayName}, ${dayOfMonth} ${monthName}`,
                it: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName.substring(0, 3)}`,
                ja: `${monthName} ${dayOfMonth}日(${dayName.substring(0, 1)})`,
                ko: `${monthName} ${dayOfMonth}일(${dayName.substring(0, 1)})`,
                pl: `${dayName}, ${dayOfMonth}. ${monthName}`,
                pt: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                ru: `${dayName}, ${dayOfMonth} ${monthName}`,
                es: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                tr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName}`,
                uz: `${dayName.substring(0, 3)}, ${dayOfMonth}-${monthName}`,
                vi: `${dayName}, ngày ${dayOfMonth} ${monthName}`,
                idn: `${dayName}, ${dayOfMonth} ${monthName}`,
                fr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`, // Jeudi, 5 avril
                az: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                sl: `${dayName}, ${dayOfMonth}. ${monthName.substring(0, 3)}.`,
                hu: `${monthName.substring(0, 3)} ${dayOfMonth}, ${dayName}`,	// Dec 22, Kedd
                ta: `${monthName} ${localizedDayOfMonth}, ${dayName}`,	// e.g.,மார்கழி 31, ஞாயிறு
                ur: `${dayName}، ${dayOfMonth} ${monthName}`,
                de: `${dayName}, ${dayOfMonth}. ${monthName}`,
                fa: `${dayName}، ${localizedDayOfMonth} ${monthName}`, // e.g., شنبه، ۲۵ اسفند
                ar_SA: `${dayName}, ${localizedDayOfMonth} ${monthName}`,	// e.g., الجمعة, 31 مايو
                el: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName}`, // Κυρ 22 Δεκ
                th: `วัน${dayName}ที่ ${dayOfMonth} ${monthName}`, // วันอาทิตย์ที่ 22 ธันวาคม
                uk: `${dayName}, ${dayOfMonth} ${monthName.substring(0, 4)}`,
                sv: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName.substring(0, 3)}`, // Sön 19 Apr
                default: `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`	// Sun, Dec 22
            };

            const newDateString = dateDisplay[currentLanguage] || dateDisplay.default;
            // Update date if date actually changed or if it's the first time
            if (newDateString !== lastDateString) {
                document.getElementById("date").innerText = newDateString;
                lastDateString = newDateString;
            }
        }
    }

    // Helper function to update hand rotation smoothly
    function updateHandRotation(handId, newRotation, currentTotal, isResetCondition) {
        let newTotal;

        // Always calculate the shortest path for smooth transitions
        const diff = newRotation - (currentTotal % 360);

        if (isFirstLoad) {
            // On first load, just set the initial position
            newTotal = newRotation;
        } else if (isResetCondition && Math.abs(diff + 360) < Math.abs(diff)) {
            // When resetting (like 59s→0s), choose the forward path if it's shorter
            newTotal = newRotation + (Math.floor(currentTotal / 360) + 1) * 360;
        } else {
            // Normal case - maintain current rotation count
            newTotal = newRotation + Math.floor(currentTotal / 360) * 360;
        }

        // Apply the smooth transition
        document.getElementById(handId).style.transition = "transform 1s ease";
        document.getElementById(handId).style.transform = `translateX(-50%) rotate(${newTotal}deg)`;

        return newTotal;
    }

    function updateanalogclock() {
        var currentTime = new Date();
        var currentSeconds = currentTime.getSeconds();
        var currentMinutes = currentTime.getMinutes();
        var currentHours = currentTime.getHours();

        // Calculate the new rotation values
        let newSecondRotation = currentSeconds * 6; // 6° per second
        let newMinuteRotation = currentMinutes * 6 + (currentSeconds / 10); // 6° per minute + adjustment for seconds
        let newHourRotation = (30 * (currentHours % 12) + currentMinutes / 2); // 30° per hour + adjustment for minutes, 12-hour cycle

        // Define reset conditions
        const secondReset = currentSeconds === 0;
        const minuteReset = currentMinutes === 0 && currentSeconds === 0;
        const hourReset = currentHours % 12 === 0 && currentMinutes === 0 && currentSeconds === 0;

        // Update each hand using the helper function
        cumulativeSecondRotation = updateHandRotation("second", newSecondRotation, cumulativeSecondRotation, secondReset);
        cumulativeMinuteRotation = updateHandRotation("minute", newMinuteRotation, cumulativeMinuteRotation, minuteReset);
        cumulativeHourRotation = updateHandRotation("hour", newHourRotation, cumulativeHourRotation, hourReset);

        // Mark that we're no longer on first load
        isFirstLoad = false;

        // Update date immediately
        updateDate();
    }

    function getGreeting() {
        const currentHour = new Date().getHours();
        let greetingKey;

        // Determine the greeting key based on the current hour
        if (currentHour < 12) {
            greetingKey = "morning";
        } else if (currentHour < 17) {
            greetingKey = "afternoon";
        } else {
            greetingKey = "evening";
        }

        // Get the user's language setting
        const currentLanguage = getLanguageStatus("selectedLanguage") || "en"; // Default to English

        // Return the translated greeting is available
        return translations[currentLanguage]?.greeting?.[greetingKey] ?? translations["en"].greeting[greetingKey];
    }

    function updatedigiClock() {
        const hourformatstored = localStorage.getItem("hourformat");
        let hourformat = hourformatstored === "true"; // Default to false if null
        const greetingCheckbox = document.getElementById("greetingcheckbox");
        const isGreetingEnabled = localStorage.getItem("greetingEnabled") === "true";
        greetingCheckbox.checked = isGreetingEnabled;

        const now = new Date();
        const dayOfWeek = now.getDay(); // Get day of the week (0-6)
        const dayOfMonth = now.getDate(); // Get current day of the month (1-31)

        const currentLanguage = getLanguageStatus("selectedLanguage") || "en";

        // Get translated day name
        let dayName = translations[currentLanguage]?.days?.[dayOfWeek] ?? translations["en"].days[dayOfWeek];

        // Localize the day of the month
        const localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

        // DATE DISPLAY FOR DIGITAL CLOCK
        const dateFormats = {
            az: `${dayName} ${dayOfMonth}`,
            bn: `${dayName}, ${localizedDayOfMonth}`,
            mr: `${dayName}, ${localizedDayOfMonth}`,
            ne: `${dayName}, ${localizedDayOfMonth}`,
            zh: `${dayOfMonth}日${dayName}`,
            zh_TW: `${dayOfMonth}日${dayName}`,
            cs: `${dayName}, ${dayOfMonth}.`,
            hi: `${dayName}, ${dayOfMonth}`,
            ja: `${dayOfMonth}日 (${dayName[0]})`,
            ko: `${dayOfMonth}일 (${dayName[0]})`,
            pl: `${dayName}, ${dayOfMonth}`,
            pt: `${dayName}, ${dayOfMonth}`,
            ru: `${dayOfMonth} ${dayName}`,
            ta: `${localizedDayOfMonth} ${dayName.substring(0, 2)}`,
            vi: `${dayOfMonth} ${dayName}`,
            idn: `${dayOfMonth} ${dayName}`,
            fr: `${dayName} ${dayOfMonth}`, // Mardi 11
            hu: `${dayName} ${dayOfMonth}`, // Kedd 11
            ur: `${dayName}، ${dayOfMonth}`,
            de: `${dayOfMonth}. ${dayName}`,
            fa: `${dayName} ${localizedDayOfMonth}`, // e.g. شنبه ۲۵
            ar_SA: `${dayName}, ${localizedDayOfMonth}`,	// e.g., الجمعة, 31
            el: `${dayName.substring(0, 3)} ${dayOfMonth}`, // Κυρ 22
            th: `${dayName}ที่ ${dayOfMonth}`,
            uk: `${dayOfMonth} ${dayName}`,
            default: `${dayOfMonth} ${dayName.substring(0, 3)}`,	// 24 Thu
        };

        const newDigitalDateString = dateFormats[currentLanguage] || dateFormats.default;
        // Update date if date actually changed or if it's the first time
        if (newDigitalDateString !== lastDigitalDateString) {
            document.getElementById("digidate").textContent = newDigitalDateString;
            lastDigitalDateString = newDigitalDateString;
        }

        // Handle time formatting based on the selected language
        let timeString;
        let period = ""; // For storing AM/PM equivalent

        // Array of languages to use "en-US" format
        const specialLanguages = ["tr", "zh", "zh_TW", "ja", "ko", "hu"]; // Languages with NaN in locale time format
        const localizedLanguages = Object.keys(numberMappings);
        // Force the "en-US" format for numeral-localized languages, otherwise, it will be localized twice, resulting in NaN

        // Set time options and determine locale based on the current language
        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: hourformat };
        const locale = specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage) ? "en-US" : currentLanguage;
        timeString = now.toLocaleTimeString(locale, timeOptions);

        // Split the time and period (AM/PM) if in 12-hour format
        if (hourformat) {
            [timeString, period] = timeString.split(" "); // Split AM/PM if present
        }

        // Split the hours and minutes from the localized time string
        let [hours, minutes] = timeString.split(":");

        // Remove leading zero from hours in 12-hour format
        if (hourformat) {
            hours = parseInt(hours, 10).toString(); // Remove leading zero
        }

        // Localize hours and minutes for the selected language
        const localizedHours = localizeNumbers(hours, currentLanguage);
        const localizedMinutes = localizeNumbers(minutes, currentLanguage);

        // Update the hour, colon, and minute text elements
        document.getElementById("digihours").textContent = localizedHours;
        document.getElementById("digicolon").textContent = ":";
        document.getElementById("digiminutes").textContent = localizedMinutes;

        if (isFirefoxAll)
            document.getElementById("digicolon").classList.add("no-blink");

        // Manually set the period for special languages if 12-hour format is enabled
        if (hourformat && (specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage))) {
            let realHours = new Date().getHours();

            // LANGUAGE-SPECIFIC AM/PM
            if (currentLanguage === "fa") {
                period = realHours < 12 ? "ق.ظ" : "ب.ظ"; // قبل از ظهر / بعد از ظهر
            } else if (currentLanguage === "ar_SA") {
                period = realHours < 12 ? "ص" : "م"; // صباحاً / مساءً
            } else if (currentLanguage === "ta") {
                if (realHours < 2) {
                    period = "யாமம்"
                } else if (realHours < 6) {
                    period = "வைகறை"
                } else if (realHours < 10) {
                    period = "காலை"
                } else if (realHours < 14) {
                    period = "நண்பகல்"
                } else if (realHours < 18) {
                    period = "எற்பாடு"
                } else if (realHours < 22) {
                    period = "மாலை"
                } else {
                    period = "யாமம்"
                }
            } else {
                period = realHours < 12 ? "AM" : "PM";
            }
        }

        // Display AM/PM if in 12-hour format
        if (hourformat) {
            document.getElementById("amPm").textContent = period; // Show AM/PM based on calculated period
        } else {
            document.getElementById("amPm").textContent = ""; // Clear AM/PM for 24-hour format
        }

        const clocktype1 = localStorage.getItem("clocktype");
        const dateElement = document.getElementById("date");
        if (clocktype1 === "digital" && isGreetingEnabled) {
            const newGreeting = getGreeting();
            if (newGreeting !== lastGreetingString) {
                dateElement.style.display = "block";
                dateElement.innerText = newGreeting;
                lastGreetingString = newGreeting;
            }
        } else if (clocktype1 === "digital") {
            dateElement.style.display = "none";  // Hide the greeting
        }
    }

    // Function to start the analog clock
    function startAnalogClock() {
        if (!analogIntervalId) { // Only set interval if not already set
            analogIntervalId = setInterval(updateanalogclock, 500);
        }
    }

    // Function to stop the analog clock
    function stopAnalogClock() {
        if (analogIntervalId) {
            clearInterval(analogIntervalId);
            analogIntervalId = null; // Reset intervalId
        }
    }

    // Function to start the digital clock
    function startDigitalClock() {
        if (!digitalIntervalId) {
            digitalIntervalId = setInterval(updatedigiClock, 1000);
        }
    }

    // Function to stop the digital clock
    function stopDigitalClock() {
        if (digitalIntervalId) {
            clearInterval(digitalIntervalId);
            digitalIntervalId = null;
        }
    }

    // Initial clock display
    displayClock();
    updateanalogclock();

    // Start appropriate clock based on type
    if (clocktype === "digital") {
        updatedigiClock();
        startDigitalClock();
        stopAnalogClock();
    } else if (clocktype === "analog") {
        if (document.visibilityState === "visible") {
            startAnalogClock();
            updateDate(); // Immediately update date when clock is analog
        }
        stopDigitalClock();
    }

    // Event listener for visibility change
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            if (clocktype === "analog") {
                startAnalogClock(); // Start the analog clock if the tab is focused
                updateDate(); // Update date when the tab becomes visible
            } else if (clocktype === "digital") {
                startDigitalClock(); // Start the digital clock if the tab is focused
            }
        } else {
            stopAnalogClock(); // Stop the analog clock if the tab is not focused
            stopDigitalClock(); // Stop the digital clock if the tab is not focused
        }
    });

    function displayClock() {
        const analogClock = document.getElementById("analogClock");
        const digitalClock = document.getElementById("digitalClock");

        if (clocktype === "analog") {
            analogClock.style.display = "block";  // Show the analog clock
            digitalClock.style.display = "none";  // Hide the digital clock
        } else if (clocktype === "digital") {
            digitalClock.style.display = "block";  // Show the digital clock
            analogClock.style.display = "none";    // Hide the analog clock
        }
    }

    // ----------------------- End of clock display -------------------------
    function resetDateDisplay() {
        const dateElement = document.getElementById("date");
        dateElement.style.display = "block";
        dateElement.innerText = "";
        lastGreetingString = null;
        lastDateString = null;
        updateDate();
    }

    // Save and load toggle state
    document.addEventListener("DOMContentLoaded", function () {
        const timeformatField = document.getElementById("timeformatField");
        const hourcheckbox = document.getElementById("12hourcheckbox");
        const digitalCheckbox = document.getElementById("digitalCheckbox");
        const greetingCheckbox = document.getElementById("greetingcheckbox");
        const greetingField = document.getElementById("greetingField");

        if (localStorage.getItem("greetingEnabled") === null) {
            localStorage.setItem("greetingEnabled", "true");
        }

        greetingCheckbox.checked = localStorage.getItem("greetingEnabled") === "true";
        greetingCheckbox.disabled = localStorage.getItem("clocktype") !== "digital";

        digitalCheckbox.addEventListener("change", function () {
            saveCheckboxState("digitalCheckboxState", digitalCheckbox);
            if (digitalCheckbox.checked) {
                timeformatField.classList.remove("inactive");
                greetingField.classList.remove("inactive");
                greetingCheckbox.disabled = false; // Enable greeting toggle
                localStorage.setItem("clocktype", "digital");
                clocktype = localStorage.getItem("clocktype");
                displayClock();
                stopAnalogClock();
                startDigitalClock();
                updatedigiClock();
                saveActiveStatus("timeformatField", "active");
                saveActiveStatus("greetingField", "active");
            } else {
                timeformatField.classList.add("inactive");
                greetingField.classList.add("inactive");
                greetingCheckbox.disabled = true; // Disable greeting toggle
                localStorage.setItem("clocktype", "analog");
                clocktype = localStorage.getItem("clocktype");
                stopDigitalClock();
                startAnalogClock();
                updateanalogclock();
                displayClock();
                resetDateDisplay();
                saveActiveStatus("timeformatField", "inactive");
                saveActiveStatus("greetingField", "inactive");
            }
        });

        hourcheckbox.addEventListener("change", function () {
            saveCheckboxState("hourcheckboxState", hourcheckbox);
            if (hourcheckbox.checked) {
                localStorage.setItem("hourformat", "true");
            } else {
                localStorage.setItem("hourformat", "false");
            }
        });

        greetingCheckbox.addEventListener("change", () => {
            localStorage.setItem("greetingEnabled", greetingCheckbox.checked);
            updatedigiClock();
        });

        loadCheckboxState("digitalCheckboxState", digitalCheckbox);
        loadCheckboxState("hourcheckboxState", hourcheckbox);
        loadActiveStatus("timeformatField", timeformatField);
        loadActiveStatus("greetingField", greetingField);
    });
}

// =================== ANALOG CLOCK STYLE SYSTEM ===================
(function () {
    const STYLE_KEY = "analogClockStyle";
    const styles = ["classic", "minimal", "rounded", "neon", "vintage"];

    function applyClockStyle(style) {
        if (!styles.includes(style)) style = "classic";

        // Show correct face
        styles.forEach(s => {
            const face = document.getElementById("clockFace-" + s);
            if (face) face.classList.toggle("active", s === style);
        });

        // Add class to analogClock for hand styling
        const analogClock = document.getElementById("analogClock");
        if (analogClock) {
            styles.forEach(s => analogClock.classList.remove("clock-" + s));
            analogClock.classList.add("clock-" + style);
        }

        // Update active button in settings
        document.querySelectorAll(".clock-style-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.style === style);
        });
    }

    function initClockStylePicker() {
        // Apply saved style on load
        const saved = localStorage.getItem(STYLE_KEY) || "classic";
        applyClockStyle(saved);

        // Wire up buttons
        document.querySelectorAll(".clock-style-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const style = this.dataset.style;
                localStorage.setItem(STYLE_KEY, style);
                applyClockStyle(style);
            });
        });

        // Hide style picker when digital clock is active
        const digitalCheckbox = document.getElementById("digitalCheckbox");
        const analogStyleField = document.getElementById("analogStyleField");
        const clockStylePicker = document.getElementById("clockStylePicker");

        function toggleStylePickerVisibility() {
            const isDigital = digitalCheckbox && digitalCheckbox.checked;
            if (analogStyleField) analogStyleField.style.display = isDigital ? "none" : "";
            if (clockStylePicker) clockStylePicker.style.display = isDigital ? "none" : "";
        }

        if (digitalCheckbox) {
            digitalCheckbox.addEventListener("change", toggleStylePickerVisibility);
        }
        toggleStylePickerVisibility();
    }

    // Run after DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initClockStylePicker);
    } else {
        initClockStylePicker();
    }
})();
// =================== END ANALOG CLOCK STYLE SYSTEM ===================

// =================== DIGITAL STYLE SYSTEM ===================
(function () {
    const DSTYLE_KEY = "digitalClockStyle";
    const dStyles = ["classic", "flip", "minimal-bar", "hybrid"];

    // Map style -> element id
    const clockDivMap = {
        "classic":     "digitalClock",
        "flip":        "flipClock",
        "minimal-bar": "minimalBarClock",
        "hybrid":      "hybridClock"
    };

    let flipIntervalId = null;
    let hybridIntervalId = null;

    // ---- Helpers ----
    function pad2(n) { return String(n).padStart(2, "0"); }

    function getHourFormat() {
        return localStorage.getItem("hourformat") === "true";
    }

    function getShortDate() {
        const now = new Date();
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }

    // ---- Flip Clock ----
    function setFlipCard(id, val) {
        const card = document.getElementById(id);
        if (!card) return;
        const numEl = card.querySelector(".flip-num");
        if (numEl && numEl.textContent !== val) {
            card.classList.remove("flipping");
            void card.offsetWidth; // reflow
            card.classList.add("flipping");
            numEl.textContent = val;
        }
    }

    function updateFlipClock() {
        const now = new Date();
        const use12 = getHourFormat();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        let period = "";

        if (use12) {
            period = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
        }

        const hStr = pad2(h);
        const mStr = pad2(m);

        setFlipCard("flipHourTens", hStr[0]);
        setFlipCard("flipHourOnes", hStr[1]);
        setFlipCard("flipMinTens",  mStr[0]);
        setFlipCard("flipMinOnes",  mStr[1]);

        const amPmEl = document.getElementById("flipAmPm");
        if (amPmEl) amPmEl.textContent = period;

        const secBarEl = document.getElementById("flipSecBar");
        if (secBarEl) secBarEl.style.width = ((s / 59) * 100) + "%";

        const secNumEl = document.getElementById("flipSecNum");
        if (secNumEl) secNumEl.textContent = pad2(s);

        const dateEl = document.getElementById("flipDateRow");
        if (dateEl) dateEl.textContent = getShortDate();
    }

    // ---- Minimal Bar Clock ----
    function updateMinimalBarClock() {
        const now = new Date();
        const use12 = getHourFormat();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        let period = "";

        if (use12) {
            period = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
        }

        const hEl = document.getElementById("mbarHours");
        const mEl = document.getElementById("mbarMinutes");
        const apEl = document.getElementById("mbarAmPm");
        const barEl = document.getElementById("mbarSecBar");
        const dateEl = document.getElementById("mbarDate");

        if (hEl) hEl.textContent = pad2(h);
        if (mEl) mEl.textContent = pad2(m);
        if (apEl) apEl.textContent = period;
        if (barEl) barEl.style.width = ((s / 59) * 100) + "%";
        if (dateEl) {
            const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            dateEl.textContent = days[now.getDay()];
        }
    }

    // ---- Hybrid Clock ----
    let hybridFirstLoad = true;
    let hCumHour = 0, hCumMinute = 0, hCumSecond = 0;

    function updateHybridClock() {
        const now = new Date();
        const use12 = getHourFormat();
        const s = now.getSeconds();
        const m = now.getMinutes();
        let h = now.getHours();
        let period = "";

        if (use12) {
            period = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
        }

        // Digital side
        const hEl = document.getElementById("hybridHours");
        const mEl = document.getElementById("hybridMinutes");
        const sEl = document.getElementById("hybridSeconds");
        const apEl = document.getElementById("hybridAmPm");
        const dateEl = document.getElementById("hybridDate");
        const colonEl = document.getElementById("hybridColon");

        if (hEl) hEl.textContent = pad2(h);
        if (mEl) mEl.textContent = pad2(m);
        if (sEl) sEl.textContent = pad2(s);
        if (apEl) apEl.textContent = period;
        if (dateEl) dateEl.textContent = getShortDate();
        if (colonEl && !colonEl.classList.contains("no-blink"))
            colonEl.style.opacity = s % 2 === 0 ? "1" : "0.3";

        // Analog hands
        const newSRot = s * 6;
        const newMRot = m * 6 + s / 10;
        const newHRot = (now.getHours() % 12) * 30 + m / 2;

        function applyHand(id, newRot, cumRot) {
            const el = document.getElementById(id);
            if (!el) return cumRot;
            let newTotal;
            const diff = newRot - (cumRot % 360);
            if (hybridFirstLoad) {
                newTotal = newRot;
            } else if (newRot === 0 && Math.abs(diff + 360) < Math.abs(diff)) {
                newTotal = newRot + (Math.floor(cumRot / 360) + 1) * 360;
            } else {
                newTotal = newRot + Math.floor(cumRot / 360) * 360;
            }
            el.style.transition = hybridFirstLoad ? "none" : "transform 1s ease";
            el.style.transform = `rotate(${newTotal}deg)`;
            return newTotal;
        }

        hCumSecond = applyHand("hybridSecond", newSRot, hCumSecond);
        hCumMinute = applyHand("hybridMinute", newMRot, hCumMinute);
        hCumHour   = applyHand("hybridHour",   newHRot, hCumHour);
        hybridFirstLoad = false;
    }

    // ---- Show / hide correct digital clock variant ----
    function applyDigitalStyle(style) {
        if (!dStyles.includes(style)) style = "classic";

        // Hide all digital variants; show selected
        dStyles.forEach(s => {
            const el = document.getElementById(clockDivMap[s]);
            if (el) el.style.display = "none";
        });

        const clocktype = localStorage.getItem("clocktype");
        if (clocktype === "digital") {
            const target = document.getElementById(clockDivMap[style]);
            if (target) target.style.display = "flex";
            // classic uses block not flex
            if (style === "classic") {
                const cl = document.getElementById("digitalClock");
                if (cl) cl.style.display = "block";
            }
        }

        // Update active button
        document.querySelectorAll(".digi-style-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.dstyle === style);
        });

        // Start/stop interval for non-classic styles
        if (flipIntervalId)   { clearInterval(flipIntervalId);   flipIntervalId = null; }
        if (hybridIntervalId) { clearInterval(hybridIntervalId); hybridIntervalId = null; }

        if (clocktype === "digital") {
            if (style === "flip") {
                updateFlipClock();
                flipIntervalId = setInterval(updateFlipClock, 500);
            } else if (style === "minimal-bar") {
                updateMinimalBarClock();
                flipIntervalId = setInterval(updateMinimalBarClock, 500);
            } else if (style === "hybrid") {
                hybridFirstLoad = true;
                const now = new Date();
                hCumSecond = now.getSeconds() * 6;
                hCumMinute = now.getMinutes() * 6 + now.getSeconds() / 10;
                hCumHour   = (now.getHours() % 12) * 30 + now.getMinutes() / 2;
                updateHybridClock();
                hybridIntervalId = setInterval(updateHybridClock, 500);
            }
        }
    }

    // ---- Toggle digital style picker visibility ----
    function toggleDigiStylePickerVisibility() {
        const digitalCheckbox = document.getElementById("digitalCheckbox");
        const isDigital = digitalCheckbox && digitalCheckbox.checked;
        const dField  = document.getElementById("digitalStyleField");
        const dPicker = document.getElementById("digitalStylePicker");
        if (dField)  dField.style.display  = isDigital ? "" : "none";
        if (dPicker) dPicker.style.display = isDigital ? "" : "none";
    }

    function initDigitalStylePicker() {
        const saved = localStorage.getItem(DSTYLE_KEY) || "classic";
        applyDigitalStyle(saved);
        toggleDigiStylePickerVisibility();

        document.querySelectorAll(".digi-style-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const style = this.dataset.dstyle;
                localStorage.setItem(DSTYLE_KEY, style);
                applyDigitalStyle(style);
            });
        });

        const digitalCheckbox = document.getElementById("digitalCheckbox");
        if (digitalCheckbox) {
            digitalCheckbox.addEventListener("change", function () {
                toggleDigiStylePickerVisibility();
                const saved2 = localStorage.getItem(DSTYLE_KEY) || "classic";
                applyDigitalStyle(saved2);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDigitalStylePicker);
    } else {
        initDigitalStylePicker();
    }
})();
// =================== END DIGITAL STYLE SYSTEM ===================
