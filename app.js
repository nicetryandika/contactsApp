const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array untuk menyimpan kontak
let contacts = [];

// Fungsi untuk menampilkan menu
function tampilkanMenu() {
    console.log('===== Aplikasi Manajemen Kontak =====');
    console.log('1. Tambah Kontak');
    console.log('2. Hapus Kontak');
    console.log('3. Cari Kontak');
    console.log('4. Urutkan Daftar Kontak');
    console.log('5. Tampilkan Daftar Kontak');
    console.log('6. Keluar');
}

// Fungsi untuk menampilkan daftar kontak
function tampilkanDaftarKontak() {
    if (contacts.length === 0) {
        console.log('Daftar kontak kosong.');
    } else {
        console.log('===== Daftar Kontak =====');
        contacts.forEach((kontak, index) => {
            console.log(`${index + 1}. Nama: ${kontak.nama},
            Nomor Telepon: ${kontak.nomorTelepon}, Alamat: ${kontak.alamat}`);
        });
        console.log('==========================');
    }
}

// Fungsi untuk menambahkan kontak baru
function tambahKontak(nama, nomorTelepon, alamat) {
    let kontakBaru = {
        nama: nama,
        nomorTelepon: nomorTelepon,
        alamat: alamat
    };
    contacts.push(kontakBaru);
    console.log('Kontak baru berhasil ditambahkan.');
    tampilkanDaftarKontak(); // Menampilkan daftar kontak setelah menambahkan kontak baru
}

// Fungsi untuk menghapus kontak berdasarkan nama atau nomor telepon
function hapusKontak(query) {
    contacts = contacts.filter(kontak => kontak.nama !== query && kontak.nomorTelepon !== query);
    console.log('Kontak berhasil dihapus.');
    tampilkanDaftarKontak(); // Menampilkan daftar kontak setelah menghapus kontak
}

// Fungsi untuk mencari kontak berdasarkan nama atau nomor telepon
function cariKontak(query) {
    let hasilPencarian = contacts.filter(kontak => kontak.nama.includes(query) || kontak.nomorTelepon.includes(query));
    console.log('Hasil pencarian:', hasilPencarian);
}

// Fungsi untuk mengurutkan daftar kontak (menggunakan Bubble Sort)
function urutkanKontak() {
    for (let i = 0; i < contacts.length - 1; i++) {
        for (let j = 0; j < contacts.length - 1 - i; j++) {
            if (contacts[j].nama > contacts[j + 1].nama) {
                let temp = contacts[j];
                contacts[j] = contacts[j + 1];
                contacts[j + 1] = temp;
            }
        }
    }
    console.log('Daftar kontak berhasil diurutkan.');
    tampilkanDaftarKontak(); // Menampilkan daftar kontak setelah diurutkan
}

// Fungsi untuk memulai aplikasi
function mainMenu() {
    tampilkanMenu();

    rl.question('Masukkan pilihan Anda: ', (pilihan) => {
        switch (pilihan) {
            case '1':
                rl.question('Masukkan nama: ', (nama) => {
                    rl.question('Masukkan nomor telepon: ', (nomorTelepon) => {
                        rl.question('Masukkan alamat: ', (alamat) => {
                            tambahKontak(nama, nomorTelepon, alamat);
                            mainMenu();
                        });
                    });
                });
                break;
            case '2':
                rl.question('Masukkan nama atau nomor telepon yang ingin dihapus: ', (query) => {
                    hapusKontak(query);
                    mainMenu();
                });
                break;
            case '3':
                rl.question('Masukkan nama atau nomor telepon yang ingin dicari: ', (query) => {
                    cariKontak(query);
                    mainMenu();
                });
                break;
            case '4':
                urutkanKontak();
                mainMenu();
                break;
            case '5':
                tampilkanDaftarKontak();
                mainMenu();
                break;
            case '6':
                console.log('Program selesai.');
                rl.close();
                break;
            default:
                console.log('Pilihan tidak valid. Silakan masukkan pilihan yang sesuai.');
                mainMenu();
                break;
        }
    });
}

// Memulai aplikasi
mainMenu();
