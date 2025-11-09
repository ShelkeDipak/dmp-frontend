self.addEventListener("install", () => {
  console.log("✅ Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("✅ Service Worker activated");
});

self.addEventListener("message", async (event) => {
  const { action, medication } = event.data;
  if (action === "scheduleReminder") {
    await scheduleNotification(medication);
  }
});

async function scheduleNotification(med) {
  if (!self.registration.showNotification) {
    console.warn("Notifications not supported.");
    return;
  }

  if (!("showTrigger" in Notification.prototype)) {
    console.warn("⏰ Notification Triggers not supported in this browser.");
    return;
  }

  const [hours, minutes] = med.time.split(":").map(Number);
  const now = new Date();
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);

  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const timestamp = alarmTime.getTime();

  // Schedule the notification trigger
  await self.registration.showNotification("💊 Medication Reminder", {
    body: `It's time to take your ${med.name}!`,
    icon: "/icons/medicine.png",
    showTrigger: new TimestampTrigger(timestamp),
    tag: med.name,
    actions: [
      { action: "taken", title: "Taken" },
      { action: "snooze", title: "Snooze 10 min" }
    ]
  });

  console.log(`⏰ Reminder set for ${med.name} at ${alarmTime}`);
}
