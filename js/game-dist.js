;(function() {

    class Square {
        constructor(x,y) {
            this.x = x
            this.y = y
            this.back = null //Cuadrado atras
        }

        draw() {
            ctx.fillRect(this.x,this.y,10,10)
            if(this.hasBack()){
                this.back.draw()
            }
        }

        add() {
            this.back = new Square(this.x, this.y)
        }

        hasBack() {
            return this.back != null
        }

        copy(){
            if(this.hasBack()){
                this.back.x = this.x
                this.back.y = this.y
            }
        }

        up(){
            this.copy()
            this.y -=10
        }

        down(){
            this.copy()
            this.y +=10
        }

        left(){
            this.copy()
            this.x -=10
        }

        right(){
            this.copy()
            this.x +=10
        }

    }

    class Snake {
        constructor() {
            this.head = new Square(100,0)
            this.draw()
            this.direccion = "right"
            this.head.add()
        }

        draw(){
            this.head.draw();
        }

        right() {
            this.direccion = "right"
        }

        left() {
            this.direccion = "left"
        }

        up() {
            this.direccion = "up"
        }

        down() {
            this.direccion = "down"
        }

        move() {
            if(this.direccion=="up") return this.head.up()
            if(this.direccion=="down") return this.head.down()
            if(this.direccion=="left") return this.head.left()
            if(this.direccion=="right") return this.head.right()
        }

    }

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const snake = new Snake()

    window.addEventListener("keydown", function(event) {
        if(event.keyCode == 40) return snake.down();
        if(event.keyCode == 39) return snake.right();
        if(event.keyCode == 38) return snake.up();
        if(event.keyCode == 37) return snake.left();
     })

    setInterval(function(){
        snake.move()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        snake.draw()
    }, 1000/10)

})()

