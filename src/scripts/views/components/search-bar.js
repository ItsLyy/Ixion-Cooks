class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
      search-bar .search-area .search-input-container{
          height: 3.2rem;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.233);
      
          margin: 0 0 1rem;
          position: relative;
      }
      
      search-bar .search-area .search-input-container input{
          width: 100%;
          height: 100%;
      
          padding: .2rem 1rem;
          box-sizing: border-box;
          font-family: inherit;
          
          border: none;
          color: inherit;
      }
      
      search-bar .search-area .search-input-container button{
          position: absolute;
          top: 0;
          right: -10px;
          z-index: 1;
      
          height: 100%;
          width: 4.5rem;
          
          background-color: var(--second);
          border: 1px solid var(--second);
          border-radius: 10px;
          transition: ease-in-out 400ms;
          transform: translateX(1);
          transform-origin: right;
      
          cursor: pointer;
      }
      
      search-bar .search-area .search-input-container button:hover{
          background-color: var(--second);
      }
      
      search-bar .search-area .search-input-container button i{
          font-size: 1.2em;
          color: #f0f0f0;
          padding: 0 .65rem 0 0;
      }
      
      search-bar .search-area input:focus{
          outline: none;
      }
      
      search-bar .search-area input:focus + button{
          transform: translateX(5rem);
      }
    </style>

    <div class="search-area">
      <div class="search-input-container">
          <input type="text" id="search-restaurant">
          <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);
