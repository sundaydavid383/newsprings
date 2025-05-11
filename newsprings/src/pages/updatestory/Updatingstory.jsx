import React, { useEffect, useState } from "react";
import "../abouts/stories.css";
import { Link } from "react-router";
import { useLocation } from "react-router";

const Updatingstory = ({ setActivePage }) => {

  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
     const baseUrl = 'http://localhost:4000/'
  useEffect(() => {
    setActivePage("testimonies");
    const fetchingStories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/getting-story");
        const data = await response.json();
        console.log("testimonies:", data);
        if (data.error) {
          alert(data.error);
          setLoading(false);
        }
        setTestimonies(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("An unexpected Error occured here");
        setLoading(false);
      }
    };

    fetchingStories();
  }, []);
  const [search, setSearch] = useState("");
  const [filteredTestimonies, setFilteredTestimonies] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    const label = document.getElementById("formlb");

    if (search.trim() === "") {
      label.textContent = "You can't search with an empty search box";
      setFilteredTestimonies([]);
      return;
    } else {
      label.textContent = ""; // Clear error message
      const splitedSearch = search.split(" ").map((word) => word.toLowerCase()); // Normalize search input to lowercase and split into words

      setFilteredTestimonies(
        testimonies.filter((story) =>
          splitedSearch.every(
            (word) =>
              story.name.toLowerCase().includes(word) ||
              story.title.toLowerCase().includes(word) ||
              story.testimony.toLowerCase().includes(word) ||
              story.testimonyCategory.toLowerCase().includes(word)
          )
        )
      );

      setSearch(""); // Clear search input
    }
  };
  return (
    <div className="about aboutstory">
      <ul className="about_nav">
        <li>
          <Link to="/mission-and-vision">Mission and Vision</Link>
        </li>
        <li>
          <Link className={``} to="/core-values">
            Core Values
          </Link>
        </li>
        <li>
          <Link className={`liactive`} to="/stories">
            Stories
          </Link>
        </li>
        <li className={``}>
          <Link to="/general">General Overseer</Link>
        </li>
        <li className={``}>
          <Link to="/our-pastor">Our Pastor</Link>
        </li>
        <li className={``}>
          <Link to="/career">Career</Link>
        </li>
      </ul>
      <div className="about_stories">
        <h1>Stories</h1>
        <h3>Go through people testimonies</h3>
        <div className="formholder">
          <div className="formconatianer">
            <form className="story_form" onSubmit={onSearch}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search for testimony by keyword, stories, etc..."
              />
              <button type="submit">
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
            <label htmlFor="" id="formlb"></label>
          </div>
        </div>

        <div className="">
          {loading ? (
            <div className="loader_holder">
              {Array.from({length:5}).map((_, index) => (
                <div key={index} className="loading_card">
                  <div className="loading_img"></div>
                  <div className="loading_title"></div>
                  <div className="loading_details"></div>
                  <div className="loading_text"></div>
                  <div className="loading_btn"></div>
                </div>
              ))}
            </div>
          ) : 
         testimonies ? 
         filteredTestimonies.length > 0 ? (
          <div className="about_stories_holder container">
            {filteredTestimonies.map((testifier, index) => (
              <div className="testifier" key={index}>
                <div className="image">
                <img src={`${baseUrl}${testifier.image}`} alt={testifier.name} />
                </div>
      
                <div className="testifier_text">
                  <h2 className="title">{testifier.title} id_{testifier._id}</h2>
                  <div className="testifier_text_upper_details">
                    <p className="name">{testifier.name}</p>
                    <div className="testimonyCategory">{testifier.testimonyCategory}</div>
                    <div className="date">{testifier.date}</div>
                  </div>
                  <div className="testimony">
                    {testifier.testimony.slice(0, 200)}......
                  </div>
                </div>
                <Link className="btn" state={testifier} to={`/share-testimony`}>
                  <p>
                    Update <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                  <div></div>
                </Link>
              </div>
            ))}
          </div>
        ) : 
        (
          <div className="about_stories_holder container">
            {testimonies.map((testifier, index) => (
              <div className="testifier" key={index}>
                <div className="image">
                  <img src={testifier.image} alt={testifier.name} />
                </div>
      
                <div className="testifier_text">
                  <h2 className="title">{testifier.title}  </h2>
                  <div className="testifier_text_upper_details">
                    <p className="name">{testifier.name}</p>
                    <div className="testimonyCategory">{testifier.testimonyCategory}</div>
                    <div className="date">{testifier.date}</div>
                  </div>
                  <div className="testimony">
                    {testifier.testimony.slice(0, 200)}......
                  </div>
                </div>
                <Link className="btn" state={testifier} to={`/share-testimony`}>
                  <p>
                    Update <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                  <div></div>
                </Link>
              </div>
            ))}
          </div>
        ): 
        <p className="nodata">No testimonies online yet</p>
          }
        </div>
      </div>
      <div className="about_links">
        <Link to={"/core-values"}>
          Core values <i class="fa-solid fa-caret-left"></i>
        </Link>
        <Link to={"/general"}>
          General Overseer <i class="fa-solid fa-caret-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Updatingstory;
