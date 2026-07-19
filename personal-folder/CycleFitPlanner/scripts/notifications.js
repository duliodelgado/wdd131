/* Notifications */

/* Show Notification */

function showNotification(
    message,
    type = "success",
    duration = 3000
) {

    removeExistingNotifications();

    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification",
        `notification-${type}`
    );

    notification.innerHTML = `
        <div class="notification-content">

            <span class="notification-icon">
                ${getNotificationIcon(type)}
            </span>

            <span class="notification-message">
                ${message}
            </span>

            <button
                class="notification-close"
                aria-label="Close notification"
            >
                ×
            </button>

        </div>
    `;

    document.body.appendChild(
        notification
    );

    requestAnimationFrame(() => {
        notification.classList.add(
            "notification-show"
        );
    });

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );

    closeButton.addEventListener(
        "click",
        () => hideNotification(notification)
    );

    setTimeout(() => {
        hideNotification(notification);
    }, duration);
}

/* Hide Notification */

function hideNotification(notification) {

    if (!notification) {
        return;
    }

    notification.classList.remove(
        "notification-show"
    );

    setTimeout(() => {

        if (
            notification.parentElement
        ) {
            notification.remove();
        }

    }, 300);
}

/* Remove Existing Notifications */

function removeExistingNotifications() {

    const notifications =
        document.querySelectorAll(
            ".notification"
        );

    notifications.forEach(
        notification => {
            notification.remove();
        }
    );
}

/* Icons */

function getNotificationIcon(type) {

    switch (type) {

        case "success":
            return "✅";

        case "error":
            return "❌";

        case "warning":
            return "⚠️";

        case "info":
            return "ℹ️";

        default:
            return "✅";
    }
}

/* Shortcut Methods */

function showSuccess(message) {
    showNotification(
        message,
        "success"
    );
}

function showError(message) {
    showNotification(
        message,
        "error"
    );
}

function showWarning(message) {
    showNotification(
        message,
        "warning"
    );
}

function showInfo(message) {
    showNotification(
        message,
        "info"
    );
}