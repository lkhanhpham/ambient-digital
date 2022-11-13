import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        quiz_name: "",
        pub_date: "",
        nr_of_rows: ""
      },
      quiz: []
      };
  }

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/quiz/');
        const quiz = await res.json();
        this.setState({
          quiz
        });
      } catch (e) {
        console.log(e);
    }
    }
    renderItems = () => {
      const newItems = this.state.quiz
      return newItems.map(item => (
        <li 
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
            className={`quiz-title mr-2`}
            quiz_name={item.description}
          >
            {item.nr_of_rows}
            {item.quiz_name}
            {item.pub_date}
          </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;
