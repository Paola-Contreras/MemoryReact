const ELEMENT_SIZE = 190
const ELEMENT_SIZE1 = 140

const imagesPool = [
    { src: './imagenes/iron1.jpg',
      matched:false },

    { src: './imagenes/iron1.jpg',
      matched:false},

    { src: './imagenes/widow1.jpg',
      matched:false},

    { src: './imagenes/widow1.jpg',
      matched:false},

    { src: './imagenes/cap1.jpg',
      matched:false},

    { src: './imagenes/cap1.jpg',
      matched:false},

    { src: './imagenes/hawkeye1.jpg',
      matched:false},

    { src: './imagenes/hawkeye1.jpg',
      matched:false},

    { src: './imagenes/thor1.jpg',
      matched:false},

    { src: './imagenes/thor1.jpg',
        matched:false},

    { src: './imagenes/spider1.jpg',
        matched:false},

    { src: './imagenes/spider1.jpg',
        matched:false},

    { src: './imagenes/hulk1.jpg',
        matched:false},

    { src: './imagenes/hulk1.jpg',
        matched:false},

    { src: './imagenes/wanda1.jpg',
        matched:false},

    { src: './imagenes/wanda1.jpg',
        matched:false}
  ];


const Card = ({number,card,choice,flip,disable}) => {
    const style = {
      width: `${ELEMENT_SIZE1}px`,
      height: `${ELEMENT_SIZE}px`,
      borderRadius: '06px'
    }

    const handleclik =()=>{
      if(!disable){
         choice (card)

      }
    }

      return (
        <div className='card'>
          <div className={`content ${flip ? 'flip': ""}`} style={style} >

            <div className="front" onClick= {handleclik}>
              <img src='./imagenes/logoA.jpg' alt='face_back' style={style}  />  
            </div>

            <div className ="back">
              <img src={card.src} alt='face_front' style={style} />
              
            </div>

          </div>
        </div>

    )
}

const App = () => {

    const [cards,setCard] = React.useState ([]);
    const [count, setCount]=React.useState(0)
    const [choice1, setChoice1]= React.useState(null);
    const [choice2, setChoice2]= React.useState(null);
    const [desabilita, setDesabilita]=React.useState(false)
    const [game, setGame]=React.useState(0);
    
    const shuffleArray =(array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    React.useEffect (() =>{ 
        shuffleArray(imagesPool);
        setCard(imagesPool);
    },[])
    
  const choice =(card)=>{
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  React.useEffect(()=>{
    if(choice1 && choice2){
      //console.log(choice1,choice2)
      setDesabilita(true)
      if(choice1.src === choice2.src){
        setCard(prevCard =>{
          return prevCard.map(card =>{
            //console.log(prevCard)
            if(card.src=== choice1.src){
              
              return{...card, matched:true}
              
            }else{
              return card
            }
          })
        })
        //console.log('aqui1')
        reset()
        setGame(game+1)
        if(game==7){
          alert('Game Over')
        }
        console.log(game)
      }else{
        //console.log('22')
        setTimeout(() => reset(), 1000)
      }
    }
  },[choice1,choice2])
//console.log(cards)

  const reset =(()=>{
    setChoice1(null)
    setChoice2(null) 
    setCount((count+1))
    setDesabilita(false)
  })

  const Github = () =>{
    window.open("https://github.com/Paola-Contreras/MemoryReact")
  }

  const reload = () =>{
    window.location.reload()
  }

    return (
      <div className='app'>

         {cards.map((card,index) => 
            <Card 
              key={index} 
              card={card}
              choice = {choice}
              flip={card === choice1 || card === choice2 || card.matched}
              disable={desabilita}

              
            ></Card>)}
      <span className="movments">Movimientos: {count}</span>
      <span className="fin">Presiona logo para reiniciar</span>
      <button onClick={reload}><img src='./imagenes/title.png' height ="90" width="170"></img></button>
      <button onClick={Github}><img src='./imagenes/git.png' height ="90" width="90"></img></button>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )