const butInstall = document.getElementById('buttonInstall');

// Initialize a variable to store the event
let deferredPrompt;

// Listen for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();

  // Store the event so it can be triggered later
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user's response
  const choiceResult = await deferredPrompt.userChoice;

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }

  // Clear the deferred prompt
  deferredPrompt = null;

  // Optionally hide the install button
  butInstall.style.display = 'none';
});

// Listen for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully', event);

  // Optionally, hide the install button after installation
  butInstall.style.display = 'none';
});
