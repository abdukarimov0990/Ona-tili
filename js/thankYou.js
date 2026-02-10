const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxEwt5ATpFJEFmUC2LM-HsSe-kuSBJc8DHi5eAg228b0MqsA9lQwn4tFdr05YA97xDx/exec";

// ✅ Sana formatlash: 11-08-2025
function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

function getFormattedTime() {
  return new Date().toLocaleTimeString("uz-UZ");
}

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    console.log("Ma'lumotlar yo‘q");
    return;
  }


  const formDataObj = JSON.parse(formDataRaw);

  const date = getFormattedDate();
  const time = getFormattedTime();

  const formData = new FormData();
  formData.append("sheetName", "Lead");
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Royhatdan o'tgan vaqti", `${date}-${time}`);

  try {
    const response = await fetch(SHEET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("✅ Ma'lumot yuborildi");
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("❌ Xatolik:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}

window.onload = sendFormData;