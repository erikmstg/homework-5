let data = [];

class FormUser {
  static id = 1;
  constructor(nama, umur, uang) {
    this.nama = nama;
    this.umur = umur;
    this.uang = uang;
  }

  run() {
    console.log("testing running...");
  }
}

class InputUser extends FormUser {
  constructor(nama, umur, uang) {
    super(nama, umur, uang);
  }

  async createData() {
    const dataRow = await this.filtering();

    const tbody = document.querySelector("tbody");
    tbody.appendChild(dataRow);

    this.cleansing();
  }

  filtering() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tdRow = document.createElement("tr");

        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdUmur = document.createElement("td");
        const tdUang = document.createElement("td");

        tdId.innerHTML = FormUser.id++;
        tdId.id = "idRow";
        tdRow.appendChild(tdId);

        tdName.innerHTML = this.nama;
        tdName.classList.add("font-medium");
        tdRow.appendChild(tdName);

        tdUmur.innerHTML = this.umur;
        tdRow.appendChild(tdUmur);

        tdUang.innerHTML = this.uang;
        tdRow.appendChild(tdUang);

        resolve(tdRow);
      }, 3000);
    });
  }

  cleansing() {
    let totalUmur = 0;
    let totalUang = 0;
    let sumUmur = null;
    let sumUang = null;

    data.push({
      allUmur: this.umur,
      allUang: this.uang,
    });

    for (let i = 0; i < data.length; i++) {
      totalUmur += Number(data[i].allUmur);
      totalUang += Number(data[i].allUang);

      sumUmur = totalUmur / data.length;
      sumUang = totalUang / data.length;
    }

    avgUmur.innerHTML = sumUmur;
    avgUang.innerHTML = sumUang;

    const alltd = document.querySelectorAll("tbody tr td");
    const alltr = document.querySelectorAll("tbody tr");

    alltd.forEach((td) => {
      if (td.id) {
        td.classList.add("px-4", "py-2", "border", "text-center");
      } else {
        td.classList.add("px-4", "py-2", "border");
      }
    });

    for (let i = 0; i < alltr.length; i++) {
      if (i % 2 === 0) {
        alltr[i].classList.add("bg-purple-200");
      } else {
        alltr[i].classList.add("bg-violet-300");
      }
    }
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!namaInput.value || !umurInput.value || !uangInput.value) {
    return alert("Input semua data");
  } else if (namaInput.value.length < 10) {
    return alert("Nama harus memiliki minimal 10 character");
  } else if (umurInput.value < 25) {
    return alert("Minimal umur adalah 25");
  } else if (uangInput.value < 100000 || uangInput.value > 1000000) {
    return alert("Uang sangu antara 100000 s/d 1000000");
  }

  const user = new InputUser(namaInput.value, umurInput.value, uangInput.value);
  await user.createData();

  (namaInput.value = null), (umurInput.value = null), (uangInput.value = null);
});
