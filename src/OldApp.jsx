import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Form, Badge, InputGroup } from "react-bootstrap"
import axios from "axios"
import ImageCard from "./components/ImageCard";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";



function App() {

  const inputValue = useRef(null)
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1)

  // set activebbutton onclick
  const [activeBtn, setActiveBtn] = useState(null)

  // setting loading state
  const [loading, setloading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")




  function resetSearch() {
    getImage();
    setPage(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputValue.current.value)
    resetSearch()
  }

  const handleClick = (selectChoice) => {
    inputValue.current.value = selectChoice
    resetSearch()
  }

  const handlePrevPage = () => {
    setPage(page - 1);
  }

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handleActive = (btnIdActive) => {
    setActiveBtn(btnIdActive)
  }

  const ApiUrl = "https://api.unsplash.com/search/photos";

  const ImagesPerPage = 12;

  const getImage = useCallback(async () => {
    try {
      if (inputValue.current.value) {
        // setErrorMsg('');
        setloading(true);
        const response = await axios.get(`${ApiUrl}?query=${inputValue.current.value}&page=${page}&per_page=${ImagesPerPage}&client_id=${import.meta.env.VITE_API_KEY}`);
        if (response.data.results.length < 1) {
          setErrorMsg("not found!!")
          setImages(response.data.results)
          setTotalPages(response.data.total_pages)
        } else {
          setImages(response.data.results)
          setTotalPages(response.data.total_pages)
          // console.log(response.data.results.length)
          setErrorMsg("")
        }
        setloading(false)
      }
    } catch (e) {
      // setErrorMsg("something's wrong");
      console.log(e)
      setloading(false);
    }
  }, [page])

  useEffect(() => {
    getImage()
  }, [getImage])

  const buttons = ["Nature", "Science", "Animation", "Vacation", "Industries"]

  return (
    <div>
      <div className="container py-4">
        <h1 className="text-center">IMAGE SPOTTER</h1>
        <p className="text-center fw-semibold text-success fst-italic fs-5"> view your favorite picture </p>
        <div className="my-5 d-flex justify-content-center">
          <div className=" col-10 col-md-5">
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup className="mb-3">
                  <Form.Control
                    ref={inputValue}
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button type="submit" variant="outline-success" id="button-addon2">
                    submit
                  </Button>
                </InputGroup>
                <Form.Text className="text-muted">
                  Search your favorite category
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-7 d-flex  justify-content-between" style={{ flexFlow: "wrap" }}>
            {buttons.map((btn, index) => (
              <div className="me-1" key={index}>
                <Badge bg="primary" className={activeBtn === index ? "active" : ""} onClick={() => (handleClick(btn), handleActive(index))} > {btn}</Badge>
              </div>
            ))}
          </div>
        </div>
        {
          loading ? (
            <p className="text-center">Fetching data</p>
          ) : (
            <div>
              <div className="row my-5">
                {
                  images.map((image) => (
                    <ImageCard key={image.id} image={image} />
                  )
                  )
                }
              </div>
              <div className="d-flex my-5 justify-content-center">
                {page > 1 && (
                  <Button className="px-4 rounded-pill me-2 " onClick={handlePrevPage}> <FaChevronCircleLeft size={25} /> </Button>
                )}
                {page < totalPages && (
                  <Button className="px-4 rounded-pill me-2 " onClick={handleNextPage}> <FaChevronCircleRight size={25} /></Button>
                )}
              </div>
            </div>
          )
        }
        <p className="text-danger fs-3 text-center">{errorMsg}</p>
      </div>
    </div>
  )
}

export default App
