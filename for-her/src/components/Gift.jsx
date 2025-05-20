import Photo from "./Photo.";


const photos = [
  {
    id: 1,
    url: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg",
  },
  {
    id: 2,
    url: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/600x300?text=3",
  },
];

function Gift() {
  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <Photo>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={photo.url}
              alt={`Slide ${photo.id}`}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            <p className="moments">the moment i saw you first</p>
          </div>
        ))}
      </Photo>
    </div>
  );
}

export default Gift;
