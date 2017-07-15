console.log('hi');

window.onload = function () {

  class Player {
    constructor(name){
      this.name = name;
    }
  }

  class Piece {
    constructor(name, player){
      this.name   = name;
      this.player = player;
      this.color  = player == 'p1' ? 'piece blue' : 'piece red';
      this.available_moves = [];
      this.selected = false;
    }

    set_row(num){
      this.current_row = num;
    }

    set_column(num){
      this.current_column = num;
    }

    set_coordinate(row,col,cells){
      this.set_row(row);
      this.set_column(col);
      this.available_moves = this.calc_available_moves(cells);
    }

    calc_available_moves(){
      return [];
    }

    valid_move(row,col){
      return _.map(this.available_moves, function(i){return JSON.stringify(i)}).includes(JSON.stringify([row,col]));
    }
  }

  class Pawn extends Piece {
    constructor(player) {
      super('pawn', player);
    }

    calc_available_moves(cells){
      var coords = [];
      var leftCell;
      var rightCell;

      if(this.player == 'p1'){

        if(this.current_row < 7){
          coords.push([this.current_row - 1, this.current_column]);
        }

        if(this.current_row == 6){
          coords.push([this.current_row - 2, this.current_column]);
        }

        leftCell = cells[this.current_row - 1][this.current_column - 1];
        rightCell = cells[this.current_row - 1][this.current_column + 1];

      }else{
        if(this.current_row > 0){
          coords.push([this.current_row + 1, this.current_column]);
        }

        if(this.current_row == 1){
          coords.push([this.current_row + 2, this.current_column]);
        }

        leftCell = cells[this.current_row + 1][this.current_column - 1];
        rightCell = cells[this.current_row + 1][this.current_column + 1];

      }

      _.remove(coords, function(i){
        return !_.isNil(cells[i[0]][i[1]]);
      });


      if(!_.isNil(leftCell) && leftCell.player != this.player){
        coords.push([leftCell.current_row, leftCell.current_column]);
      }

      if(!_.isNil(rightCell) && rightCell.player != this.player){
        coords.push([rightCell.current_row, rightCell.current_column]);
      }

      if(this.name=='pawn1'){
        console.log(coords);
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
      // this.p1    = new Player('p1');
      // this.p2    = new Player('p2');
      this.cells = this.generate_initial_board();
    }

    generate_initial_board(){
      var cells = {
        0: [new Rook('p2'), new Knight('p2'), new Bishop('p2'), new Queen('p2'), new King('p2'), new Bishop('p2'), new Knight('p2'), new Rook('p2')],
        1: [new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2')],
        2: [null, null, null, null, null, null, null, null],
        3: [null, null, null, null, null, null, null, null],
        4: [null, null, null, null, null, null, null, null],
        5: [null, null, null, null, null, null, null, null],
        6: [new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1')],
        7: [new Rook('p1'), new Knight('p1'), new Bishop('p1'), new King('p1'), new Queen('p1'), new Bishop('p1'), new Knight('p1'), new Rook('p1')]
      };

      cells[6][3].name = 'pawn1'

      for(var row = 0; row < 8; row++){
        for(var col = 0; col < 8; col++){
          if( !_.isNull(cells[row][col]) ){
            cells[row][col].set_coordinate(row,col,cells);
          }
        }
      }

      return cells;
    }

  }

  var chessPiece = Vue.component('chess-piece', {
    props: ['piece'],
    template: '<div v-on:click="select" class="piece" :class="[piece.color,{selected: isSelected()}]">{{piece.name}}</div>',
    methods: {
      select: function(event){
        console.log('select');
        if(this.piece.player == this.$parent.currentPlayer){
          this.$parent.setSelectedPiece(this.piece);
        }
      },
      isSelected: function(){
        return this.$parent.selectedPiece == this.piece;
      }
    }
  });

  window.App = new Vue({
    el: '#chessboard',
    data: {
      cells: new Board().cells,
      currentPlayer: 'p1',
      selectedPiece: null,
      // highlighted_cells: []
    },
    components: {chessPiece: chessPiece},
    computed: {
      cellClass: function(){
        var vm = this;
        return function(row,col){
          return {
            even_row: this.isEven(row),
            odd_row:  this.isOdd(row),
            even_col: this.isEven(col),
            odd_col:  this.isOdd(col)
          };
        };
      }
    },
    methods:{
      move: function(row,col){
        console.log('move')
         row = parseInt(row);
          if(!_.isNull(this.selectedPiece) && this.selectedPiece.valid_move(row,col)){
            console.log('available moves: ' + this.selectedPiece.available_moves);
            this.cells[row][col] = this.selectedPiece;
            this.cells[this.selectedPiece.current_row][this.selectedPiece.current_column] = null;
            this.selectedPiece.set_coordinate(row, col, this.cells);
            this.selectedPiece = null;
            this.currentPlayer = this.currentPlayer == 'p1' ? 'p2' : 'p1';
            for(var i = 0; i < 8 ;i++){
              for(var j = 0; j < 8; j ++){
                var piece = this.cells[i][j];
                if(!_.isNil(piece)){
                  piece.available_moves = piece.calc_available_moves(this.cells);
                }
              }
            }
          }
      },
      setSelectedPiece: function(piece){
        if(this.selectedPiece == piece){
          this.selectedPiece = null;
          piece.selected = false;
        }else{
          this.selectedPiece = piece;
          piece.selected = true;
        }
      },
      highlighted: function(row,col){
        row = parseInt(row);
        if(!_.isNull(this.selectedPiece)){
          return this.selectedPiece.valid_move(row,col) || (this.selectedPiece.current_row == row && this.selectedPiece.current_column == col)
        }else{
          return null;
        }
      },
      isEven: function(num){
        return num % 2 == 0;
      },
      isOdd: function(num){
        return num % 2 == 1;
      },
      flattenCells: function(){
        return _.flatten(_.values(this.cells));
      },
      ccellClass: function(row, col){

        this.isEven(row)
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



