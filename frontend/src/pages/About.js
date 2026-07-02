import React from 'react';

const About = () => {
  const team = [
    { name: 'Анна', role: 'Хип-Хоп, Дэнсхолл', exp: '7 лет', img: 'https://avatars.mds.yandex.net/get-altay/4054675/2a000001750d56affe4bce7d91983eded654/XXXL' },
    { name: 'Михаил', role: 'Контемпорари, Джаз-модерн', exp: '10 лет', img: 'https://avatars.mds.yandex.net/i?id=fc5e5466788b3dbce2aca4cf052e7f4d_l-5879086-images-thumbs&n=13' },
    { name: 'София', role: 'Сальса, Бачата', exp: '5 лет', img: 'https://avatars.mds.yandex.net/get-altay/4001569/2a000001750d56bf20d6e6e3a274bdfcc7ce/XXXL' },
  ];
  const gallery = [
    'https://avatars.mds.yandex.net/get-altay/2035926/2a0000016fa383d281f990ed703980721637/orig',
    'https://avatars.mds.yandex.net/i?id=eb5d7b0b8a3895b92417efb9fc3ee7a1b29973c1-10637298-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/get-altay/1583511/2a0000016fa3586534d456fbe9e4b499cb2e/XXXL',
    'https://p0.zoon.ru/preview/zr9iWBUs6qxqfmPxkw_Grg/1199x800x85/1/f/e/original_5746075140c088c7398b8a4c_609c129e850e8.jpg',
    'https://avatars.mds.yandex.net/get-altay/1592431/2a0000016fa35df6eae62414aca68feef293/L',
    'https://avatars.mds.yandex.net/get-altay/1592431/2a0000016fa3585cbd50ee653ee8df140108/XXXL',
  ];

  return (
    <div className="fade-in">
      <h1 className="text-center mb-5">О нашей студии</h1>
      <div className="about-grid">
        <div className="about-text">
          <h2>Наша история</h2>
          <p>Студия "Урбанакадемия" была основана в 2018 году группой энтузиастов, желающих делиться своей страстью к танцам. За эти годы мы выросли из маленькой комнаты в современную студию с 3 залами и 15 преподавателями.</p>
          <p>Наша миссия — сделать танцы доступными для всех, независимо от возраста и уровня подготовки. Мы верим, что танец — это язык души, который может говорить каждый.</p>
          <p>Сегодня Урбанакадемия — это не просто танцевальная студия, а настоящее сообщество единомышленников. Мы регулярно проводим мастер-классы, организуем выступления и участвуем в городских мероприятиях.</p>
        </div>
        <div className="about-img"><img src="https://avatars.mds.yandex.net/get-altay/4001569/2a0000017511dcef886f2e8b1de66a9a7d18/XXXL" alt="Студия" /></div>
      </div>
      <h2 className="text-center mt-5">Наша команда</h2>
      <div className="team-grid">
        {team.map(m => (
          <div key={m.name} className="team-card">
            <img src={m.img} alt={m.name} />
            <h3>{m.name}</h3>
            <p>{m.role}</p>
            <p>Опыт: {m.exp}</p>
          </div>
        ))}
      </div>
      <h2 className="text-center mt-5">Фотогалерея</h2>
      <div className="gallery-grid">
        {gallery.map((url, idx) => <img key={idx} src={url} alt={`Галерея ${idx+1}`} loading="lazy" />)}
      </div>
    </div>
  );
};
export default About;