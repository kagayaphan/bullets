function Cell(data, link){
  this.obj = data;
  this.link = link;
}

// 連結リスト
function List(){
  var cp = new Cell(null, null);
  this.top = cp;
}

List.prototype = function(){
  // n 番目のセルを返す
  function nth(cp, n){
	var i = -1;
	while(cp != null){
	  if(n == i) return cp;
	  cp = cp.link;
	  i += 1;
	}
	return null;
  };
  function end(cp){
	while(cp != null){
	  if( !cp.link ) return cp;
	  cp = cp.link;
	}
	return null;
  };
  var obj = {
	// n 番目の要素を返す
	At: function(n){
	  var cp = nth(this.top, n);
	  if(cp) return cp.obj;
	  return null;
	},

	// n 番目にデータを挿入
	Insert: function(n, x){
	  var cp = nth(this.top, n - 1);
	  if(cp){
		cp.link = new Cell(x, cp.link);
		return x;
	  }
	  return null;
	},
	// 末尾にデータを挿入
	Add: function(x){
	  var cp = end(this.top);
	  if(cp){
		cp.link = new Cell(x, cp.link);
		return x;
	  }
	  return null;
	},

	// n 番目の要素を削除
	RemoveIndex: function(n){
	  var cp = nth(this.top, n - 1);
	  if(cp && cp.link){
		var obj = cp.link.obj;
		cp.link = cp.link.link;
		return obj;
	  }
	  return null;
	},
	// 指定要素を削除
	Remove: function(n){
	  this.RemoveIndex( this.IndexOf(n) );
	  return n;
	},
	// イテレータ
	IndexOf: function(obj){
	  var cp = this.top.link;
	  var index = 0;
	  while(cp != null){
		if( cp.obj == obj )
		{
			return index;
		}
	 	index++;
		cp = cp.link;
	  }
	  return -1;
	},

	// イテレータ
	Each: function(func){
	  var cp = this.top.link;
	  while(cp != null){
		func(cp.obj);
		cp = cp.link;
	  }
	},
	EachIndex: function(func){
	  var cp = this.top.link;
	  var i=0;
	  while(cp != null){
		func(cp.obj,i);
		cp = cp.link;
		i++;
	  }
	},
	// イテレータ
	EachBreak: function(func){
	  var cp = this.top.link;
	  while(cp != null){
		if( !func(cp.obj) )return cp.obj;
		cp = cp.link;
	  }
	  return null;
	},

	// 空リストか
	IsEmpty: function(){ return this.top.link == null; },

	// 配列への変換
	ToArray: function(){
	  var ary = [];
	  this.Each(function(x){ ary.push(x); });
	  return ary;
	},

	// 文字列への変換
	ToString: function(){
	  return "(" + this.ToArray().join(", ") + ")";
	}
  };
  return obj;
}();
