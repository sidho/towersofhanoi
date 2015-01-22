(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.main = $el;
    this.render();
    this.clickTower();
    this.move = [];
    this.stat = true;
  };

  View.prototype.render = function () {
    $('main').html('');
    for(var i = 0; i < this.game.towers.length; i++) {
        var $stack = $('<div class="stacks">');
        $stack.data("pos", i);
        this.main.append($stack);
        for(var j = 0; j < this.game.towers[i].length; j++) {
          var $div = $('<div class="disc">');
          // $div.data("pos", i);
          var discNum = this.game.towers[i][j];
          $div.css("width", (100 * discNum) +'px');
          $stack.append($div);
        }
    }
  };

  View.prototype.clickTower = function () {
    var that = this;
    this.main.on("click", ".stacks", function (event) {
      var $stack = $(event.currentTarget);
      var pos = $stack.data('pos');

      if (that.stat) {
        that.move[0] = pos;
        that.stat = false;
        $stack.removeClass("stacks");
        $stack.addClass("stacks-selected");
      } else {
        that.move[1] = pos;
        that.stat = true;
        var $highlighted = $('stacks-selected');
        $highlighted.removeClass('stacks-selected');
        $highlighted.addClass('stacks');
        that.game.move(that.move[0], that.move[1]);
        that.render();
        if (that.game.isWon()) {
          alert("You win!");
          that.main.off("click");
        };
      }
    });
  }

})();
