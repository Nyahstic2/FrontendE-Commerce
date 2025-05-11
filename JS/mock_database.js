export default class Database {
    DB_KEY = "database";

    constructor() {
      this.id = 0;
      this.init();
    }
    
    async init() {
      if (!localStorage.getItem(this.DB_KEY)) {
        let promise = await fetch("../mockdata/products.json");
        if (promise.ok){
            let json = await promise.json();
            console.table(json.products);
            this.save(json.products);
        }
      }
    }
    
    getAll() {
      return JSON.parse(localStorage.getItem(this.DB_KEY)) || [];
    }

    getItem(id){
        return this.getAll().find(p => parseInt(p.id) === parseInt(id));
    }  
    
    save(data) {
      localStorage.setItem(this.DB_KEY, JSON.stringify(data));
    }
    
    add(produto) {
      const produtos = this.getAll();
      produto.id = this.id++;  
      produtos.push(produto);
      this.save(produtos);
    }
    
    update(id, novosDados) {
        const produtos = this.getAll().filter(p => parseInt(p.id) !== parseInt(id)); 
        const itemAtualizado = { id: parseInt(id), ...novosDados }; 
        produtos.push(itemAtualizado); 
        produtos.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        this.save(produtos); 
    } 
    
    remove(id) {
      const produtos = this.getAll().filter(p => p.id !== id);
      this.save(produtos);
    }
    
    clear() {
      localStorage.setItem(this.DB_KEY, JSON.stringify([]));
    }

    reset(){
        localStorage.removeItem(this.DB_KEY);
        this.init();
    }
  }
  