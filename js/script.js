const kiki_contactForm = document.getElementById("kiki_contact_form");

if (!(kiki_contactForm instanceof HTMLFormElement)) {
    throw new Error("Form Contact Kost Annaysa tidak ditemukan.");
}

// Penghitung karakter pesan
const kiki_messageField = kiki_contactForm.elements.namedItem("pesan");
const kiki_messageCounter = document.getElementById("kiki_contact_pesan_counter");
const kiki_whatsappFallback = document.getElementById("kiki_contact_whatsapp_fallback");
const kiki_whatsappFallbackLink = kiki_whatsappFallback?.querySelector("a");

if (
    !(kiki_messageField instanceof HTMLTextAreaElement) ||
    !(kiki_messageCounter instanceof HTMLElement) ||
    !(kiki_whatsappFallback instanceof HTMLParagraphElement) ||
    !(kiki_whatsappFallbackLink instanceof HTMLAnchorElement)
) {
    throw new Error("Elemen form Contact tidak ditemukan.");
}

function kiki_updateMessageCounter() {
    kiki_messageCounter.textContent =
        `${kiki_messageField.value.length}/${kiki_messageField.maxLength} karakter`;
}

kiki_messageField.addEventListener("input", kiki_updateMessageCounter);
kiki_updateMessageCounter();

// Validasi formulir dan membuka WhatsApp dengan pesan yang sudah diisi.
function kiki_handleContactSubmit(event) {
    event.preventDefault();

    const formData = new FormData(kiki_contactForm);
    const nama = formData.get("nama");
    const email = formData.get("email");
    const pesan = formData.get("pesan");

    if (
        typeof nama !== "string" ||
        typeof email !== "string" ||
        typeof pesan !== "string"
    ) {
        window.alert(
            "Data form tidak lengkap. Silakan muat ulang halaman dan coba lagi."
        );
        return;
    }

    const namaBersih = nama.trim();
    const emailBersih = email.trim();
    const pesanBersih = pesan.trim();
    const kolomKosong = [];

    if (!namaBersih) {
        kolomKosong.push("nama lengkap");
    }

    if (!emailBersih) {
        kolomKosong.push("email");
    }

    if (!pesanBersih) {
        kolomKosong.push("pesan");
    }

    if (kolomKosong.length > 0) {
        window.alert(
            `Mohon isi ${kolomKosong.join(", ")} sebelum melanjutkan.`
        );
        return;
    }

    if (!kiki_contactForm.reportValidity()) {
        return;
    }

    const pesanWhatsApp = [
        "Halo Pak Turyaman, saya ingin menghubungi Kost Annaysa.",
        "",
        `Nama: ${namaBersih}`,
        `Email: ${emailBersih}`,
        `Pesan: ${pesanBersih}`,
    ].join("\n");

    const urlWhatsApp =
        `https://wa.me/6285722274021?text=${encodeURIComponent(pesanWhatsApp)}`;
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
    kiki_whatsappFallbackLink.href = urlWhatsApp;
    kiki_whatsappFallback.hidden = false;
}

kiki_contactForm.addEventListener("submit", kiki_handleContactSubmit);
