;(function() {

    class Random {
        static get(inicio, final){
            return Math.floor(Math.random() * final) + inicio
        }
    }

    class Food {

        constructor(x,y){
            this.x = x
            this.y = y
            this.width = 10
            this.height = 10
        }

        static generate(){
            return new Food(Random.get(0,500), Random.get(0,300))
        }

        draw(){
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }

    }

    class Square {
        constructor(x,y) {
            this.x = x
            this.y = y
            this.width = 10
            this.height = 10
            this.back = null //Cuadrado atras
        }

        draw() {
            ctx.fillRect(this.x,this.y,this.width,this.height)
            if(this.hasBack()){
                this.back.draw()
            }
        }

        add() {
            if(this.hasBack()) return this.back.add()
            this.back = new Square(this.x, this.y)
        }

        hasBack() {
            return this.back != null
        }

        copy(){
            if(this.hasBack()){
                this.back.copy();
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

        hit(head , segundo = false) {
            if(this == head && !this.hasBack()) return false  //Por si es solo cabeza
            if(this == head) return this.back.hit(head, true) // El true sirve para indicar si se trata del segundo cuadro del cuerpo

            if(segundo && !this.hasBack()) return false
            if(segundo) return this.back.hit(head)

            //No es ni la cabeza, ni el segundo.

            if(this.hasBack()) {
                return squareHit(this, head) || this.back.hit(head)
            }

            //No es la cabeza, ni el segundo y soy el ultimo.

            return squareHit(this, head)
        }

        hitBorder() {
            return (this.x > 490 || this.x < 0 || this.y > 290 || this.y < 0)
        }

    }

    class Snake {
        constructor() {
            this.head = new Square(100,0)
            this.draw()
            this.direccion = "right"
            this.head.add()
            this.head.add()
            this.head.add()
            this.head.add()
            this.head.add()
        }

        draw(){
            this.head.draw();
        }

        right() {
            if (this.direccion == "left") return;
            this.direccion = "right"
        }

        left() {
            if (this.direccion == "right") return;
            this.direccion = "left"
        }

        up() {
            if (this.direccion == "down") return;
            this.direccion = "up"
        }

        down() {
            if (this.direccion == "up") return;
            this.direccion = "down"
        }

        move() {
            if(this.direccion=="up") return this.head.up()
            if(this.direccion=="down") return this.head.down()
            if(this.direccion=="left") return this.head.left()
            if(this.direccion=="right") return this.head.right()
        }

        eat(){
            this.head.add()
        }

        dead() {
            return this.head.hit(this.head) || this.head.hitBorder()
        }

    }

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const snake = new Snake()
    let foods = [];

    window.addEventListener("keydown", function(event) {

        if(event.keyCode > 36 && event.keyCode < 41) event.preventDefault()

        if(event.keyCode == 40) return snake.down();
        if(event.keyCode == 39) return snake.right();
        if(event.keyCode == 38) return snake.up();
        if(event.keyCode == 37) return snake.left();

        return false
     })

    const animacion = setInterval(function(){
        snake.move()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        snake.draw()
        drawFood() //Mantiene el plano de la comida.
        if(snake.dead()){
            alert("Se acabó el juego")
            window.clearInterval(animacion)
        }
    }, 1000/10)

    function drawFood() {
        for (const index in foods){
            const food = foods[index]
            if(typeof food != "undefined"){
                food.draw()
                if(hit(food, snake.head)){
                    snake.eat()
                    removeFromFoods(food)
                }
            }
        }
    }

    setInterval(function () {
        const food = Food.generate()
        foods.push(food) //Agrega la comida creada al arreglo

        setTimeout(function () {
            //Elimina la comida
            removeFromFoods(food)
        }, 10000) //cada 10 segundos.

    },4000)// cada 4 segundos

    function removeFromFoods(food) {
        // El resultado de filter es otro arreglo con los objetos que cumplieron con
        // cierta condición.
        foods = foods.filter(function(f) {
            return food !== f
        })
    }

    function squareHit(cuadrado1 , cuadrado2 ) {
        return cuadrado1.x == cuadrado2.x && cuadrado1.y == cuadrado2.y
    }

    function hit(a,b){
        var hit = false;
            if(b.x + b.width >= a.x && b.x < a.x + a.width){

                if(b.y + b.height >= a.y && b.y < a.y + a.height){
                    hit=true;
                }
            }

            if(b.x <= a.x && b.x + b.width >= a.x + a.width){

                if(b.y <= a.y && b.y + b.height >= a.y + a.height){
                    hit=true;
                }
            }

            if(a.x <=b.x && a.x + a.width >= b.x + b.width){

                if(a.y <= b.y && a.y + a.height >= b.y + b.height){
                    hit = true;
                }
            }
            return hit;
    }﻿


})()
