export default function SavesPage() {
  return <div>
  <h1>Saves</h1>

  <div className="card">
      <img src="image1.jpg" alt="Book Cover" />
      <div className="card-content">
          <h2>繪本名稱 1</h2>
          <input type="range" value="50" />
      </div>
  </div>

  <div className="card">
      <img src="image2.jpg" alt="Book Cover" />
      <div className="card-content">
          <h2>繪本名稱 2</h2>
          <input type="range" value="50" />
      </div>
  </div>

  </div>;
  
} 
