(function () {
    const app = window.PortfolioApp;
    const SOUND_KEY = 'yc-profile-sound';
    const MOTION_KEY = 'yc-profile-motion';
    const MOTION_OPTIONS = new Set(['full', 'reduced']);
    let audioContext = null;

    function readStorage(key, fallback) {
        try {
            return window.localStorage.getItem(key) || fallback;
        } catch {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            // The experience remains usable when storage is unavailable.
        }
    }

    function updateSoundControls() {
        const enabled = !!app.state.soundEnabled;

        document.querySelectorAll('[data-sound-toggle]').forEach((button) => {
            button.setAttribute('aria-pressed', String(enabled));
            button.setAttribute('aria-label', enabled ? 'Turn sound off' : 'Turn sound on');
            button.title = enabled ? 'Sound is on' : 'Sound is off';
            const label = button.querySelector('[data-sound-label]');
            const icon = button.querySelector('[data-sound-icon]');
            if (label) label.textContent = enabled ? 'Sound on' : 'Sound off';
            if (icon) icon.textContent = enabled ? '🔊' : '🔇';
        });
    }

    function updateMotionControls() {
        document.querySelectorAll('[data-motion-option]').forEach((button) => {
            const active = button.dataset.motionOption === app.state.motionPreference;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function getAudioContext() {
        if (!audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return null;
            audioContext = new AudioContext();
        }

        if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
        return audioContext;
    }

    app.playSound = function playSound(kind = 'tap') {
        if (!app.state.soundEnabled) return;

        const context = getAudioContext();
        if (!context) return;

        const profiles = {
            enable: [[523.25, 0], [659.25, 0.07]],
            boot: [[392, 0], [523.25, 0.08], [783.99, 0.16]],
            view: [[440, 0], [554.37, 0.06]],
            open: [[587.33, 0], [698.46, 0.055]],
            close: [[698.46, 0], [523.25, 0.055]],
            tap: [[493.88, 0]]
        };
        const notes = profiles[kind] || profiles.tap;
        const start = context.currentTime + 0.01;

        notes.forEach(([frequency, delay], index) => {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            const noteStart = start + delay;
            const duration = kind === 'boot' ? 0.13 : 0.085;

            oscillator.type = index % 2 ? 'sine' : 'triangle';
            oscillator.frequency.setValueAtTime(frequency, noteStart);
            gain.gain.setValueAtTime(0.0001, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.035, noteStart + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
            oscillator.connect(gain);
            gain.connect(context.destination);
            oscillator.start(noteStart);
            oscillator.stop(noteStart + duration + 0.02);
        });
    };

    app.applySoundPreference = function applySoundPreference(enabled, shouldPersist = true) {
        app.state.soundEnabled = !!enabled;
        document.body.dataset.sound = app.state.soundEnabled ? 'on' : 'off';
        updateSoundControls();
        if (shouldPersist) writeStorage(SOUND_KEY, app.state.soundEnabled ? 'on' : 'off');
    };

    app.applyMotionPreference = function applyMotionPreference(preference, shouldPersist = true) {
        const normalized = MOTION_OPTIONS.has(preference) ? preference : 'full';
        app.state.motionPreference = normalized;
        document.body.dataset.motion = normalized;
        updateMotionControls();
        if (shouldPersist) writeStorage(MOTION_KEY, normalized);
        if (typeof app.refreshMotionPreference === 'function') app.refreshMotionPreference();
    };

    app.initPreferences = function initPreferences() {
        const storedSound = readStorage(SOUND_KEY, 'off') === 'on';
        const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const storedMotion = readStorage(MOTION_KEY, systemReduced ? 'reduced' : 'full');

        app.applySoundPreference(storedSound, false);
        app.applyMotionPreference(storedMotion, false);

        document.addEventListener('click', (event) => {
            const soundButton = event.target.closest('[data-sound-toggle]');
            const motionButton = event.target.closest('[data-motion-option]');

            if (soundButton) {
                app.applySoundPreference(!app.state.soundEnabled);
                if (app.state.soundEnabled) app.playSound('enable');
            }

            if (motionButton) {
                app.applyMotionPreference(motionButton.dataset.motionOption || 'full');
                app.playSound('tap');
            }
        });
    };
})();
