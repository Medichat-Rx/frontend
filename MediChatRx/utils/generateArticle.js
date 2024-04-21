// const { Hercai } = require("hercai");

import { Hercai } from "hercai";
const herc = new Hercai();
export default async function generateArticle() {
  let articles = [
    {
      id: 1,
      title: "Manfaat Tidur yang Cukup Bagi Kesehatan",
      content:
        "Tidur yang cukup memiliki banyak manfaat bagi kesehatan tubuh, seperti meningkatkan daya tahan tubuh, memperbaiki mood, meningkatkan kinerja otak, mengurangi risiko penyakit jantung, dan memperpanjang usia. Kualitas tidur yang baik dapat membantu dalam pemulihan dan regenerasi sel-sel tubuh yang rusak. Selain itu, tidur yang cukup juga berperan penting dalam menjaga keseimbangan hormon, termasuk hormon yang mengatur nafsu makan, sehingga dapat membantu dalam mengontrol berat badan. Pentingnya tidur yang cukup juga tercermin dari dampak negatif kurang tidur, yang bisa menyebabkan penurunan fungsi kognitif, peningkatan risiko obesitas, dan gangguan mood. Oleh karena itu, menjaga kualitas dan kuantitas tidur adalah investasi penting untuk kesehatan jangka panjang.",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbm0fbNtKPCYTYIIFoAIebvmrnusSEHpSJpXP2qy7Ew&s",
    },
    {
      id: 2,
      title: "Tips Menjaga Kesehatan Mental di Tengah Pandemi",
      content:
        "Di tengah pandemi, menjaga kesehatan mental sama pentingnya dengan menjaga kesehatan fisik. Berikut beberapa tips yang bisa dilakukan: pertama, tetap terhubung dengan keluarga dan teman untuk mendukung satu sama lain. Kedua, menjaga rutinitas sehari-hari sebisa mungkin untuk memberikan rasa normalitas dan kontrol. Ketiga, melakukan aktivitas fisik secara teratur untuk mengurangi stres. Keempat, mencoba teknik relaksasi seperti meditasi atau yoga untuk menenangkan pikiran. Kelima, jika perlu, jangan ragu untuk mencari bantuan profesional. Menjaga kesehatan mental tidak hanya penting untuk kesejahteraan individu, tetapi juga untuk kesejahteraan komunitas secara keseluruhan. Dengan menjaga kesehatan mental, kita dapat lebih kuat menghadapi tantangan yang ditimbulkan oleh pandemi ini.",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnpMpKKtYy5P8jlYfAkinJEcrrRjTjznip3NkDo7Z1Q&s",
    },
    {
      id: 3,
      title: "Rahasia Makanan Sehat untuk Menjaga Berat Badan Ideal",
      content:
        "Memilih makanan sehat dan seimbang merupakan kunci untuk menjaga berat badan ideal. Temukan rahasianya di sini: pertama, fokus pada konsumsi buah dan sayur yang kaya akan serat dan nutrisi. Kedua, pilih sumber protein yang sehat seperti ikan, daging tanpa lemak, dan kacang-kacangan. Ketiga, batasi konsumsi makanan olahan dan tinggi gula. Keempat, perhatikan porsi makan dan jangan lupa untuk sarapan. Kelima, minum air putih yang cukup dan hindari minuman manis. Dengan mengikuti prinsip-prinsip ini, tidak hanya berat badan yang dapat terjaga, tetapi juga kesehatan secara keseluruhan akan meningkat. Makanan sehat adalah dasar dari gaya hidup sehat, dan dengan memilih makanan yang tepat, kita dapat menikmati hidup yang lebih panjang dan lebih bahagia.",
      imgUrl:
        "https://cdn0-production-images-kly.akamaized.net/bz-HYzDq4Sms06fDDzKToQ1ELIk=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3428411/original/061184500_1618380820-healthy-people-salad-food-woman_1303-1528.jpg",
    },
    {
      id: 4,
      title: "Pentingnya Aktivitas Fisik dan Cara Menyegarkannya",
      content:
        "Aktivitas fisik secara teratur tidak hanya membantu menjaga kebugaran tubuh tetapi juga kesehatan mental. Melakukan olahraga secara rutin dapat meningkatkan mood, mengurangi risiko depresi dan kecemasan. Cara menyegarkan aktivitas fisik antara lain dengan mencoba berbagai jenis olahraga, menetapkan tujuan yang realistis, dan berolahraga bersama teman atau keluarga. Variasi dalam jenis olahraga dapat mencegah kebosanan dan memotivasi untuk terus aktif. Selain itu, mengintegrasikan aktivitas fisik ke dalam kegiatan sehari-hari, seperti berjalan kaki atau bersepeda ke tempat kerja, juga dapat menjadi cara efektif untuk tetap aktif. Dengan menjadikan aktivitas fisik sebagai bagian dari rutinitas harian, kita dapat meningkatkan kualitas hidup secara keseluruhan dan menikmati manfaat jangka panjang untuk kesehatan fisik dan mental.",
      imgUrl:
        "https://cdn.hellosehat.com/wp-content/uploads/2021/04/3da14934-jumlah-aktivitas-fisik-650x434.jpg",
    },
    {
      id: 5,
      title: "Mengenal Berbagai Jenis Diet dan Efeknya bagi Kesehatan",
      content:
        "Diet merupakan salah satu cara untuk menjaga atau mencapai berat badan ideal. Penting untuk memilih jenis diet yang sesuai dengan kebutuhan dan kondisi kesehatan masing-masing individu. Beberapa jenis diet populer antara lain diet keto, diet mediterania, dan diet vegan. Masing-masing memiliki kelebihan dan kekurangan serta efek yang berbeda terhadap kesehatan. Diet keto fokus pada konsumsi lemak tinggi dengan karbohidrat sangat rendah, yang dapat membantu penurunan berat badan tetapi mungkin memiliki risiko bagi kesehatan jantung. Diet mediterania menekankan pada konsumsi buah, sayur, ikan, dan minyak zaitun, yang diketahui baik untuk kesehatan jantung. Sementara diet vegan, yang menghindari semua produk hewani, dapat mengurangi risiko penyakit kronis tetapi memerlukan perencanaan yang cermat untuk memenuhi kebutuhan nutrisi. Memahami kelebihan dan kekurangan dari masing-masing diet dapat membantu dalam memilih diet yang paling sesuai dengan gaya hidup dan tujuan kesehatan individu.",
      imgUrl:
        "https://d3uhejzrzvtlac.cloudfront.net/compro/articleMobile/8f1d0b97-7faf-42cc-9a2e-42feb9fe7bb4.jpeg",
    },
  ];
  try {
    const instructions = `tolong buatkan 10 data article yang berhubungan dengan kesehatan atau obat-obatan berupa array of object, contohnya seperti ini, tidak boleh sama seperti contoh, buat contennya menjadi panjang dan gunakan bahasa Indonesia: 
    {
        "id": Math.floor(Math.random() * Date.now()).toString();,
        "title": "Manfaat Olahraga Bagi Kesehatan Tubuh",
        "content": "Olahraga memiliki banyak manfaat bagi kesehatan tubuh. Manfaat olahraga antara lain meningkatkan daya tahan tubuh, mengurangi risiko penyakit jantung, menjaga berat badan ideal, dan meningkatkan kualitas tidur. Selain itu, olahraga juga dapat meningkatkan produksi hormon endorfin yang dapat membuat kita merasa lebih bahagia dan mengurangi stres."
    },

      PERLU DIPERHATIKAN: tolong buat responsmu menjadi array of objectnya saja, tanpa ada tambahan kata kata lain.
    `;
    const { reply } = await herc.question({
      model: "v3",
      content: instructions,
    });

    console.log(reply);

    const data = JSON.parse(reply);

    data.forEach((item) => {
      articles.push(item);
    });

    // Mengacak urutan data dalam array articles
    for (let i = articles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [articles[i], articles[j]] = [articles[j], articles[i]];
    }

    // console.log(data);

    return articles;
  } catch (error) {
    console.log(error);
    return articles;
  }
}

// generateArticle().then((res) => console.log(res));
