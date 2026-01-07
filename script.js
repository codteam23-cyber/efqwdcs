// ===================================
// DEEPSENSE - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffects();
    initStatusUpdates();
    initSetupSelection();
});

// ===================================
// Navbar Scroll Effect
// ===================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled past threshold
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll-triggered Animations
// ===================================

function initScrollAnimations() {
    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll(
        '.feature-card, .status-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('features-grid') || parent.classList.contains('status-grid'))) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Subtle Parallax Effects
// ===================================

function initParallaxEffects() {
    const bgGlow = document.querySelector('.bg-glow');
    const hexGrid = document.querySelector('.hex-grid');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax for background glow
                if (bgGlow) {
                    bgGlow.style.transform = `translate(${scrolled * 0.02}px, ${scrolled * 0.05}px)`;
                }
                
                // Parallax for hex grid
                if (hexGrid) {
                    hexGrid.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.1}px))`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// Simulated Status Updates
// ===================================

function initStatusUpdates() {
    // Update "last updated" times periodically for undetected games only
    const statusCards = document.querySelectorAll('.status-card');
    
    // Simulate real-time feel by occasionally updating the text
    setInterval(() => {
        statusCards.forEach(card => {
            const badge = card.querySelector('.status-badge');
            const updateEl = card.querySelector('.last-update');
            
            // Only update if it's an "undetected" status, not "coming soon"
            if (badge && badge.classList.contains('undetected') && updateEl) {
                if (Math.random() > 0.7) {
                    const times = ['Updated just now', 'Updated 1m ago', 'Updated 2m ago', 'Updated 3m ago'];
                    updateEl.textContent = times[Math.floor(Math.random() * times.length)];
                }
            }
        });
    }, 30000); // Update every 30 seconds
}

// ===================================
// Mouse Move Effect on Hero
// ===================================

document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const rect = hero.getBoundingClientRect();
    const isInHero = (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    );
    
    if (isInHero) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const logoGlow = document.querySelector('.logo-glow');
        if (logoGlow) {
            logoGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
    }
});

// ===================================
// Button Ripple Effect
// ===================================

document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Setup Selection
// ===================================

function initSetupSelection() {
    const setupCards = document.querySelectorAll('.setup-card');
    const osSelectionSection = document.getElementById('setup');
    const stepsSection = document.getElementById('setup-steps');
    const dcontrolSection = document.getElementById('setup-dcontrol');
    const deviceSecuritySection = document.getElementById('setup-device-security');
    
    // Step 1 Modal elements
    const backToOsBtn = document.getElementById('back-to-os');
    const openModalBtn = document.getElementById('open-confirm-modal');
    const modal = document.getElementById('confirm-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const goBackBtn = document.getElementById('modal-go-back');
    const continueBtn = document.getElementById('modal-continue');
    const confirmCheckbox = document.getElementById('confirm-checkbox');
    
    // dControl section elements
    const backToStepsBtn = document.getElementById('back-to-steps');
    const openDcontrolModalBtn = document.getElementById('open-dcontrol-modal');
    
    // dControl Modal elements
    const dcontrolModal = document.getElementById('dcontrol-modal');
    const closeDcontrolModalBtn = document.getElementById('close-dcontrol-modal');
    const dcontrolGoBackBtn = document.getElementById('dcontrol-go-back');
    const dcontrolContinueBtn = document.getElementById('dcontrol-continue');
    const dcontrolCheckbox = document.getElementById('dcontrol-checkbox');
    
    // Device Security section elements
    const backToDcontrolBtn = document.getElementById('back-to-dcontrol');
    const openDeviceSecurityModalBtn = document.getElementById('open-device-security-modal');
    
    // Device Security Modal elements
    const deviceSecurityModal = document.getElementById('device-security-modal');
    const closeDeviceSecurityModalBtn = document.getElementById('close-device-security-modal');
    const deviceSecurityGoBackBtn = document.getElementById('device-security-go-back');
    const deviceSecurityContinueBtn = document.getElementById('device-security-continue');
    const deviceSecurityCheckbox = document.getElementById('device-security-checkbox');
    
    // ==================== WINDOWS 10 ELEMENTS ====================
    // Windows 10 Section elements
    const win10StepsSection = document.getElementById('win10-setup-steps');
    const win10DcontrolSection = document.getElementById('win10-setup-dcontrol');
    const win10DeviceSecuritySection = document.getElementById('win10-setup-device-security');
    const win10LoaderSection = document.getElementById('win10-setup-loader');
    
    // Windows 10 Step 1 elements
    const win10BackToOsBtn = document.getElementById('win10-back-to-os');
    const win10OpenModalBtn = document.getElementById('win10-open-modal');
    const win10Modal = document.getElementById('win10-confirm-modal');
    const win10CloseModalBtn = document.getElementById('win10-close-modal');
    const win10GoBackBtn = document.getElementById('win10-go-back');
    const win10ContinueBtn = document.getElementById('win10-continue');
    const win10ConfirmCheckbox = document.getElementById('win10-confirm-checkbox');
    
    // Windows 10 dControl elements
    const win10BackToStepsBtn = document.getElementById('win10-back-to-steps');
    const win10OpenDcontrolModalBtn = document.getElementById('win10-open-dcontrol-modal');
    const win10DcontrolModal = document.getElementById('win10-dcontrol-modal');
    const win10CloseDcontrolModalBtn = document.getElementById('win10-close-dcontrol-modal');
    const win10DcontrolGoBackBtn = document.getElementById('win10-dcontrol-go-back');
    const win10DcontrolContinueBtn = document.getElementById('win10-dcontrol-continue');
    const win10DcontrolCheckbox = document.getElementById('win10-dcontrol-checkbox');
    
    // Windows 10 Device Security elements
    const win10BackToDcontrolBtn = document.getElementById('win10-back-to-dcontrol');
    const win10OpenDeviceSecurityModalBtn = document.getElementById('win10-open-device-security-modal');
    const win10DeviceSecurityModal = document.getElementById('win10-device-security-modal');
    const win10CloseDeviceSecurityModalBtn = document.getElementById('win10-close-device-security-modal');
    const win10DeviceSecurityGoBackBtn = document.getElementById('win10-device-security-go-back');
    const win10DeviceSecurityContinueBtn = document.getElementById('win10-device-security-continue');
    const win10DeviceSecurityCheckbox = document.getElementById('win10-device-security-checkbox');
    
    // Windows 10 Loader elements
    const win10BackToDeviceSecurityBtn = document.getElementById('win10-back-to-device-security');
    const win10OpenFinalModalBtn = document.getElementById('win10-open-final-modal');
    const win10FinalModal = document.getElementById('win10-final-modal');
    const win10CloseFinalModalBtn = document.getElementById('win10-close-final-modal');
    const win10FinalGoBackBtn = document.getElementById('win10-final-go-back');
    const win10FinalContinueBtn = document.getElementById('win10-final-continue');
    const win10FinalCheckbox = document.getElementById('win10-final-checkbox');
    
    // If we're not on the setup page, exit
    if (!setupCards.length) return;
    
    // Helper function to trigger animations and scroll to top
    function triggerAnimations(section) {
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const animatedElements = section.querySelectorAll('.step-card, .dcontrol-card, .dcontrol-steps, .steps-actions');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
    }
    
    setupCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedOS = card.dataset.os;
            
            // Remove selected class from all cards
            setupCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Update the select button text
            setupCards.forEach(c => {
                const selectBtn = c.querySelector('.setup-select');
                if (c.classList.contains('selected')) {
                    selectBtn.textContent = 'Selected';
                } else {
                    selectBtn.textContent = 'Select';
                }
            });
            
            // If Windows 11 is selected, show the steps section
            if (selectedOS === 'win11' && stepsSection) {
                setTimeout(() => {
                    osSelectionSection.style.display = 'none';
                    stepsSection.style.display = 'flex';
                    triggerAnimations(stepsSection);
                }, 300);
            }
            
            // If Windows 10 is selected, show the Win10 steps section
            if (selectedOS === 'win10' && win10StepsSection) {
                setTimeout(() => {
                    osSelectionSection.style.display = 'none';
                    win10StepsSection.style.display = 'flex';
                    triggerAnimations(win10StepsSection);
                }, 300);
            }
            
            console.log('Selected OS:', selectedOS);
        });
    });
    
    // Back to OS selection
    if (backToOsBtn) {
        backToOsBtn.addEventListener('click', () => {
            stepsSection.style.display = 'none';
            osSelectionSection.style.display = 'flex';
            
            // Reset selection
            setupCards.forEach(c => {
                c.classList.remove('selected');
                const selectBtn = c.querySelector('.setup-select');
                selectBtn.textContent = 'Select';
            });
        });
    }
    
    // Open confirmation modal (Step 1)
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal function
    function closeModal(modalEl) {
        if (modalEl) {
            modalEl.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => closeModal(modal));
    }
    
    if (goBackBtn) {
        goBackBtn.addEventListener('click', () => closeModal(modal));
    }
    
    // Close modal when clicking overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Checkbox validation (Step 1)
    if (confirmCheckbox && continueBtn) {
        confirmCheckbox.addEventListener('change', () => {
            continueBtn.disabled = !confirmCheckbox.checked;
        });
        
        continueBtn.addEventListener('click', () => {
            if (confirmCheckbox.checked) {
                // Close modal and show dControl section
                closeModal(modal);
                stepsSection.style.display = 'none';
                dcontrolSection.style.display = 'flex';
                triggerAnimations(dcontrolSection);
            }
        });
    }
    
    // Back to Steps section
    if (backToStepsBtn) {
        backToStepsBtn.addEventListener('click', () => {
            dcontrolSection.style.display = 'none';
            stepsSection.style.display = 'flex';
            triggerAnimations(stepsSection);
            
            // Reset first modal checkbox
            if (confirmCheckbox) {
                confirmCheckbox.checked = false;
                continueBtn.disabled = true;
            }
        });
    }
    
    // Open dControl confirmation modal
    if (openDcontrolModalBtn && dcontrolModal) {
        openDcontrolModalBtn.addEventListener('click', () => {
            dcontrolModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close dControl modal
    if (closeDcontrolModalBtn) {
        closeDcontrolModalBtn.addEventListener('click', () => closeModal(dcontrolModal));
    }
    
    if (dcontrolGoBackBtn) {
        dcontrolGoBackBtn.addEventListener('click', () => closeModal(dcontrolModal));
    }
    
    if (dcontrolModal) {
        dcontrolModal.addEventListener('click', (e) => {
            if (e.target === dcontrolModal) {
                closeModal(dcontrolModal);
            }
        });
    }
    
    // dControl checkbox validation - now goes to Device Security
    if (dcontrolCheckbox && dcontrolContinueBtn) {
        dcontrolCheckbox.addEventListener('change', () => {
            dcontrolContinueBtn.disabled = !dcontrolCheckbox.checked;
        });
        
        dcontrolContinueBtn.addEventListener('click', () => {
            if (dcontrolCheckbox.checked) {
                // Close modal and show Device Security section
                closeModal(dcontrolModal);
                dcontrolSection.style.display = 'none';
                deviceSecuritySection.style.display = 'flex';
                triggerAnimations(deviceSecuritySection);
            }
        });
    }
    
    // Back to dControl section
    if (backToDcontrolBtn) {
        backToDcontrolBtn.addEventListener('click', () => {
            deviceSecuritySection.style.display = 'none';
            dcontrolSection.style.display = 'flex';
            triggerAnimations(dcontrolSection);
            
            // Reset dControl modal checkbox
            if (dcontrolCheckbox) {
                dcontrolCheckbox.checked = false;
                dcontrolContinueBtn.disabled = true;
            }
        });
    }
    
    // Open Device Security confirmation modal
    if (openDeviceSecurityModalBtn && deviceSecurityModal) {
        openDeviceSecurityModalBtn.addEventListener('click', () => {
            deviceSecurityModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close Device Security modal
    if (closeDeviceSecurityModalBtn) {
        closeDeviceSecurityModalBtn.addEventListener('click', () => closeModal(deviceSecurityModal));
    }
    
    if (deviceSecurityGoBackBtn) {
        deviceSecurityGoBackBtn.addEventListener('click', () => closeModal(deviceSecurityModal));
    }
    
    if (deviceSecurityModal) {
        deviceSecurityModal.addEventListener('click', (e) => {
            if (e.target === deviceSecurityModal) {
                closeModal(deviceSecurityModal);
            }
        });
    }
    
    // Device Security checkbox validation - goes to Driver Blocklist section
    if (deviceSecurityCheckbox && deviceSecurityContinueBtn) {
        deviceSecurityCheckbox.addEventListener('change', () => {
            deviceSecurityContinueBtn.disabled = !deviceSecurityCheckbox.checked;
        });
        
        deviceSecurityContinueBtn.addEventListener('click', () => {
            if (deviceSecurityCheckbox.checked) {
                // Close modal and show Driver Blocklist section
                closeModal(deviceSecurityModal);
                deviceSecuritySection.style.display = 'none';
                driverBlocklistSection.style.display = 'flex';
                triggerAnimations(driverBlocklistSection);
            }
        });
    }
    
    // Driver Blocklist section elements
    const driverBlocklistSection = document.getElementById('setup-driver-blocklist');
    const backToDeviceSecurityBtn = document.getElementById('back-to-device-security');
    const openDriverBlocklistModalBtn = document.getElementById('open-driver-blocklist-modal');
    
    // Driver Blocklist Modal elements
    const driverBlocklistModal = document.getElementById('driver-blocklist-modal');
    const closeDriverBlocklistModalBtn = document.getElementById('close-driver-blocklist-modal');
    const driverBlocklistGoBackBtn = document.getElementById('driver-blocklist-go-back');
    const driverBlocklistContinueBtn = document.getElementById('driver-blocklist-continue');
    const driverBlocklistCheckbox = document.getElementById('driver-blocklist-checkbox');
    
    // Loader section elements
    const loaderSection = document.getElementById('setup-loader');
    const backToDriverBlocklistBtn = document.getElementById('back-to-driver-blocklist');
    const openFinalModalBtn = document.getElementById('open-final-modal');
    
    // Final Modal elements
    const finalModal = document.getElementById('final-modal');
    const closeFinalModalBtn = document.getElementById('close-final-modal');
    const finalGoBackBtn = document.getElementById('final-go-back');
    const finalContinueBtn = document.getElementById('final-continue');
    const finalCheckbox = document.getElementById('final-checkbox');
    
    // Back to Device Security section
    if (backToDeviceSecurityBtn) {
        backToDeviceSecurityBtn.addEventListener('click', () => {
            driverBlocklistSection.style.display = 'none';
            deviceSecuritySection.style.display = 'flex';
            triggerAnimations(deviceSecuritySection);
            
            // Reset device security modal checkbox
            if (deviceSecurityCheckbox) {
                deviceSecurityCheckbox.checked = false;
                deviceSecurityContinueBtn.disabled = true;
            }
        });
    }
    
    // Open Driver Blocklist confirmation modal
    if (openDriverBlocklistModalBtn && driverBlocklistModal) {
        openDriverBlocklistModalBtn.addEventListener('click', () => {
            driverBlocklistModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close Driver Blocklist modal
    if (closeDriverBlocklistModalBtn) {
        closeDriverBlocklistModalBtn.addEventListener('click', () => closeModal(driverBlocklistModal));
    }
    
    if (driverBlocklistGoBackBtn) {
        driverBlocklistGoBackBtn.addEventListener('click', () => closeModal(driverBlocklistModal));
    }
    
    if (driverBlocklistModal) {
        driverBlocklistModal.addEventListener('click', (e) => {
            if (e.target === driverBlocklistModal) {
                closeModal(driverBlocklistModal);
            }
        });
    }
    
    // Driver Blocklist checkbox validation - goes to Loader section
    if (driverBlocklistCheckbox && driverBlocklistContinueBtn) {
        driverBlocklistCheckbox.addEventListener('change', () => {
            driverBlocklistContinueBtn.disabled = !driverBlocklistCheckbox.checked;
        });
        
        driverBlocklistContinueBtn.addEventListener('click', () => {
            if (driverBlocklistCheckbox.checked) {
                // Close modal and show Loader section
                closeModal(driverBlocklistModal);
                driverBlocklistSection.style.display = 'none';
                loaderSection.style.display = 'flex';
                triggerAnimations(loaderSection);
            }
        });
    }
    
    // Back to Driver Blocklist section
    if (backToDriverBlocklistBtn) {
        backToDriverBlocklistBtn.addEventListener('click', () => {
            loaderSection.style.display = 'none';
            driverBlocklistSection.style.display = 'flex';
            triggerAnimations(driverBlocklistSection);
            
            // Reset driver blocklist modal checkbox
            if (driverBlocklistCheckbox) {
                driverBlocklistCheckbox.checked = false;
                driverBlocklistContinueBtn.disabled = true;
            }
        });
    }
    
    // Open Final confirmation modal
    if (openFinalModalBtn && finalModal) {
        openFinalModalBtn.addEventListener('click', () => {
            finalModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close Final modal
    if (closeFinalModalBtn) {
        closeFinalModalBtn.addEventListener('click', () => closeModal(finalModal));
    }
    
    if (finalGoBackBtn) {
        finalGoBackBtn.addEventListener('click', () => closeModal(finalModal));
    }
    
    if (finalModal) {
        finalModal.addEventListener('click', (e) => {
            if (e.target === finalModal) {
                closeModal(finalModal);
            }
        });
    }
    
    // Final checkbox validation - redirects to Discord
    if (finalCheckbox && finalContinueBtn) {
        finalCheckbox.addEventListener('change', () => {
            finalContinueBtn.disabled = !finalCheckbox.checked;
        });
        
        finalContinueBtn.addEventListener('click', () => {
            if (finalCheckbox.checked) {
                // Setup complete - redirect to Discord
                closeModal(finalModal);
                window.location.href = 'https://discord.gg/9MwWK6WYcT';
            }
        });
    }
    
    // ==================== WINDOWS 10 EVENT LISTENERS ====================
    
    // Back to OS selection from Windows 10
    if (win10BackToOsBtn) {
        win10BackToOsBtn.addEventListener('click', () => {
            win10StepsSection.style.display = 'none';
            osSelectionSection.style.display = 'flex';
            
            // Reset selection
            setupCards.forEach(c => {
                c.classList.remove('selected');
                const selectBtn = c.querySelector('.setup-select');
                selectBtn.textContent = 'Select';
            });
        });
    }
    
    // Windows 10 Step 1 - Open confirmation modal
    if (win10OpenModalBtn && win10Modal) {
        win10OpenModalBtn.addEventListener('click', () => {
            win10Modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Windows 10 Step 1 - Close modal
    if (win10CloseModalBtn) {
        win10CloseModalBtn.addEventListener('click', () => closeModal(win10Modal));
    }
    
    if (win10GoBackBtn) {
        win10GoBackBtn.addEventListener('click', () => closeModal(win10Modal));
    }
    
    if (win10Modal) {
        win10Modal.addEventListener('click', (e) => {
            if (e.target === win10Modal) {
                closeModal(win10Modal);
            }
        });
    }
    
    // Windows 10 Step 1 - Checkbox validation
    if (win10ConfirmCheckbox && win10ContinueBtn) {
        win10ConfirmCheckbox.addEventListener('change', () => {
            win10ContinueBtn.disabled = !win10ConfirmCheckbox.checked;
        });
        
        win10ContinueBtn.addEventListener('click', () => {
            if (win10ConfirmCheckbox.checked) {
                closeModal(win10Modal);
                win10StepsSection.style.display = 'none';
                win10DcontrolSection.style.display = 'flex';
                triggerAnimations(win10DcontrolSection);
            }
        });
    }
    
    // Windows 10 Step 2 - Back to Steps
    if (win10BackToStepsBtn) {
        win10BackToStepsBtn.addEventListener('click', () => {
            win10DcontrolSection.style.display = 'none';
            win10StepsSection.style.display = 'flex';
            triggerAnimations(win10StepsSection);
            
            if (win10ConfirmCheckbox) {
                win10ConfirmCheckbox.checked = false;
                win10ContinueBtn.disabled = true;
            }
        });
    }
    
    // Windows 10 Step 2 - Open dControl modal
    if (win10OpenDcontrolModalBtn && win10DcontrolModal) {
        win10OpenDcontrolModalBtn.addEventListener('click', () => {
            win10DcontrolModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Windows 10 Step 2 - Close dControl modal
    if (win10CloseDcontrolModalBtn) {
        win10CloseDcontrolModalBtn.addEventListener('click', () => closeModal(win10DcontrolModal));
    }
    
    if (win10DcontrolGoBackBtn) {
        win10DcontrolGoBackBtn.addEventListener('click', () => closeModal(win10DcontrolModal));
    }
    
    if (win10DcontrolModal) {
        win10DcontrolModal.addEventListener('click', (e) => {
            if (e.target === win10DcontrolModal) {
                closeModal(win10DcontrolModal);
            }
        });
    }
    
    // Windows 10 Step 2 - dControl checkbox validation
    if (win10DcontrolCheckbox && win10DcontrolContinueBtn) {
        win10DcontrolCheckbox.addEventListener('change', () => {
            win10DcontrolContinueBtn.disabled = !win10DcontrolCheckbox.checked;
        });
        
        win10DcontrolContinueBtn.addEventListener('click', () => {
            if (win10DcontrolCheckbox.checked) {
                closeModal(win10DcontrolModal);
                win10DcontrolSection.style.display = 'none';
                win10DeviceSecuritySection.style.display = 'flex';
                triggerAnimations(win10DeviceSecuritySection);
            }
        });
    }
    
    // Windows 10 Step 3 - Back to dControl
    if (win10BackToDcontrolBtn) {
        win10BackToDcontrolBtn.addEventListener('click', () => {
            win10DeviceSecuritySection.style.display = 'none';
            win10DcontrolSection.style.display = 'flex';
            triggerAnimations(win10DcontrolSection);
            
            if (win10DcontrolCheckbox) {
                win10DcontrolCheckbox.checked = false;
                win10DcontrolContinueBtn.disabled = true;
            }
        });
    }
    
    // Windows 10 Step 3 - Open Device Security modal
    if (win10OpenDeviceSecurityModalBtn && win10DeviceSecurityModal) {
        win10OpenDeviceSecurityModalBtn.addEventListener('click', () => {
            win10DeviceSecurityModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Windows 10 Step 3 - Close Device Security modal
    if (win10CloseDeviceSecurityModalBtn) {
        win10CloseDeviceSecurityModalBtn.addEventListener('click', () => closeModal(win10DeviceSecurityModal));
    }
    
    if (win10DeviceSecurityGoBackBtn) {
        win10DeviceSecurityGoBackBtn.addEventListener('click', () => closeModal(win10DeviceSecurityModal));
    }
    
    if (win10DeviceSecurityModal) {
        win10DeviceSecurityModal.addEventListener('click', (e) => {
            if (e.target === win10DeviceSecurityModal) {
                closeModal(win10DeviceSecurityModal);
            }
        });
    }
    
    // Windows 10 Step 3 - Device Security checkbox validation (goes directly to Loader)
    if (win10DeviceSecurityCheckbox && win10DeviceSecurityContinueBtn) {
        win10DeviceSecurityCheckbox.addEventListener('change', () => {
            win10DeviceSecurityContinueBtn.disabled = !win10DeviceSecurityCheckbox.checked;
        });
        
        win10DeviceSecurityContinueBtn.addEventListener('click', () => {
            if (win10DeviceSecurityCheckbox.checked) {
                closeModal(win10DeviceSecurityModal);
                win10DeviceSecuritySection.style.display = 'none';
                win10LoaderSection.style.display = 'flex';
                triggerAnimations(win10LoaderSection);
            }
        });
    }
    
    // Windows 10 Final Step - Back to Device Security
    if (win10BackToDeviceSecurityBtn) {
        win10BackToDeviceSecurityBtn.addEventListener('click', () => {
            win10LoaderSection.style.display = 'none';
            win10DeviceSecuritySection.style.display = 'flex';
            triggerAnimations(win10DeviceSecuritySection);
            
            if (win10DeviceSecurityCheckbox) {
                win10DeviceSecurityCheckbox.checked = false;
                win10DeviceSecurityContinueBtn.disabled = true;
            }
        });
    }
    
    // Windows 10 Final Step - Open Final modal
    if (win10OpenFinalModalBtn && win10FinalModal) {
        win10OpenFinalModalBtn.addEventListener('click', () => {
            win10FinalModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Windows 10 Final Step - Close Final modal
    if (win10CloseFinalModalBtn) {
        win10CloseFinalModalBtn.addEventListener('click', () => closeModal(win10FinalModal));
    }
    
    if (win10FinalGoBackBtn) {
        win10FinalGoBackBtn.addEventListener('click', () => closeModal(win10FinalModal));
    }
    
    if (win10FinalModal) {
        win10FinalModal.addEventListener('click', (e) => {
            if (e.target === win10FinalModal) {
                closeModal(win10FinalModal);
            }
        });
    }
    
    // Windows 10 Final Step - Checkbox validation (redirects to Discord)
    if (win10FinalCheckbox && win10FinalContinueBtn) {
        win10FinalCheckbox.addEventListener('change', () => {
            win10FinalContinueBtn.disabled = !win10FinalCheckbox.checked;
        });
        
        win10FinalContinueBtn.addEventListener('click', () => {
            if (win10FinalCheckbox.checked) {
                closeModal(win10FinalModal);
                window.location.href = 'https://discord.gg/9MwWK6WYcT';
            }
        });
    }
    
    // Close any modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Windows 11 modals
            if (modal && modal.classList.contains('active')) {
                closeModal(modal);
            }
            if (dcontrolModal && dcontrolModal.classList.contains('active')) {
                closeModal(dcontrolModal);
            }
            if (deviceSecurityModal && deviceSecurityModal.classList.contains('active')) {
                closeModal(deviceSecurityModal);
            }
            if (driverBlocklistModal && driverBlocklistModal.classList.contains('active')) {
                closeModal(driverBlocklistModal);
            }
            if (finalModal && finalModal.classList.contains('active')) {
                closeModal(finalModal);
            }
            // Windows 10 modals
            if (win10Modal && win10Modal.classList.contains('active')) {
                closeModal(win10Modal);
            }
            if (win10DcontrolModal && win10DcontrolModal.classList.contains('active')) {
                closeModal(win10DcontrolModal);
            }
            if (win10DeviceSecurityModal && win10DeviceSecurityModal.classList.contains('active')) {
                closeModal(win10DeviceSecurityModal);
            }
            if (win10FinalModal && win10FinalModal.classList.contains('active')) {
                closeModal(win10FinalModal);
            }
        }
    });
}

// ===================================
// Console Easter Egg
// ===================================

console.log(`
%c██████╗ ███████╗███████╗██████╗ ███████╗███████╗███╗   ██╗███████╗███████╗
%c██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝
%c██║  ██║█████╗  █████╗  ██████╔╝███████╗█████╗  ██╔██╗ ██║███████╗█████╗  
%c██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ╚════██║██╔══╝  ██║╚██╗██║╚════██║██╔══╝  
%c██████╔╝███████╗███████╗██║     ███████║███████╗██║ ╚████║███████║███████╗
%c╚═════╝ ╚══════╝╚══════╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝
`,
'color: #ff1a1a',
'color: #ff3333',
'color: #ff4d4d',
'color: #ff6666',
'color: #ff8080',
'color: #ff9999'
);

console.log('%cUndetected. Untraceable. Unstoppable.', 'color: #888; font-size: 14px; font-family: monospace;');

