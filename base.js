console.log('hi');

window.onload = function () {

  class Piece {
    constructor(name, player){
      this.name   = name;
      this.player = player;
      this.class  = player == 'p1' ? 'piece blue' : 'piece red';
    }

    set_row(num){
      this.current_row = num;
    }

    set_column(num){
      this.current_column = num;
    }

    set_coordinate(row,col){
      this.set_row(row);
      this.set_column(col);
    }

    available_moves(){
      return [];
    }
  }

  class Pawn extends Piece {
    constructor(player) {
      super('pawn', player);
    }

    available_moves(){
      var coords = [];

      if(this.current_row < 7){
        coords.push([this.current_row - 1, this.current_column]);
      }

      if(this.current_row == 6){
        coords.push([this.current_row - 2, this.current_column]);
      }

      return coords;
    }
  }

  class Rook extends Piece {
    constructor(player) {
      super('rook', player);
    }
  }

  class Knight extends Piece {
    constructor(player) {
      super('knight', player);
    }
  }

  class Bishop extends Piece {
    constructor(player) {
      super('bishop', player);
    }
  }

  class Queen extends Piece {
    constructor(player) {
      super('queen', player);
    }
  }

  class King extends Piece {
    constructor(player) {
      super('king', player);
    }
  }

  class Board{
    constructor(){
      this.cells = this.generate_initial_board();
    }

    generate_initial_board(){
      var cells = {
        0: [new Rook('p1'), new Knight('p1'), new Bishop('p1'), new Queen('p1'), new King('p1'), new Bishop('p1'), new Knight('p1'), new Rook('p1')],
        1: [new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1')],
        2: [null, null, null, null, null, null, null, null],
        3: [null, null, null, null, null, null, null, null],
        4: [null, null, null, null, null, null, null, null],
        5: [null, null, null, null, null, null, null, null],
        6: [new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2')],
        7: [new Rook('p2'), new Knight('p2'), new Bishop('p2'), new King('p2'), new Queen('p2'), new Bishop('p2'), new Knight('p2'), new Rook('p2')]
      }

      for(var row = 0; row < 8; row++){
        for(var col = 0; col < 8; col++){
          if( !_.isNull(cells[row][col]) ){
            cells[row][col].set_coordinate(row,col);
          }
        }
      }

      return cells;
    }

  }

  var chessPiece = Vue.component('chess-piece', {
    props: ['piece'],
    template: '<div v-on:click="select" :class="piece.class">{{piece.name}}</div>',
    methods: {
      select: function(event){
        $('.piece').removeClass('selected').parent().removeClass('selected');
        $(event.target).addClass('selected');
        $(event.target).parent().addClass('selected');

        this.$parent.$data.highlighted_cells = [];
        for(let i of this.piece.available_moves()){
          console.log(i);
          this.$parent.$data.highlighted_cells.push((i[0]*8) + i[1]);
        }


      }
    }
  });

  window.App = new Vue({
    el: '#chessboard',
    data: {
      // cells: {
      //   A: [new Rook('p1'), new Knight('p1'), new Bishop('p1'), new Queen('p1'), new King('p1'), new Bishop('p1'), new Knight('p1'), new Rook('p1')],
      //   B: [new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1')],
      //   C: [null, null, null, null, null, null, null, null],
      //   D: [null, null, null, null, null, null, null, null],
      //   E: [null, null, null, null, null, null, null, null],
      //   F: [null, null, null, null, null, null, null, null],
      //   G: [new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2')],
      //   H: [new Rook('p2'), new Knight('p2'), new Bishop('p2'), new King('p2'), new Queen('p2'), new Bishop('p2'), new Knight('p2'), new Rook('p2')]
      // }
      cells: new Board().cells,
      highlighted_cells: []
    },
    components: {chessPiece: chessPiece},
    methods:{
      flattenCells: function(){
        return _.flatten(_.values(this.cells));
      },
      cellClass: function(row, col){
        var num = row*8 + col
        var cssClass = '';

        if(Math.floor(num/8) % 2 === 0 || num < 8){
          even = 'white-cell';
          odd  = 'black-cell';
        } else {
          even = 'black-cell';
          odd  = 'white-cell';
        }

        cssClass = ((num % 8) % 2 === 0) ? even : odd;

        if(_.includes(this.highlighted_cells, num)){
          cssClass += ' selected';
        }
        return cssClass;
      },

    }
  });

};



