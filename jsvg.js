// http://code.jquery.com/jquery-1.7.2.js
var rclass = /[\n\t\r]/g,
  rspace = /\s+/,
  rreturn = /\r/g,
  rtype = /^(?:button|input)$/i,
  rfocusable = /^(?:button|input|object|select|textarea)$/i,
  rclickable = /^a(?:rea)?$/i,
  rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
  getSetAttribute = jQuery.support.getSetAttribute,
  nodeHook, boolHook, fixSpecified;

changeClass = function(elem,classNames,mode,value){
  switch(mode){
    case 'add':
      setClass = " " + elem.baseVal + " ";

      for ( c = 0, cl = classNames.length; c < cl; c++ ) {
        if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
          setClass += classNames[ c ] + " ";
        }
      }
      return jQuery.trim( setClass );
    case 'remove':
        className = (" " + elem.baseVal + " ").replace( rclass, " " );
        for ( c = 0, cl = classNames.length; c < cl; c++ ) {
          className = className.replace(" " + classNames[ c ] + " ", " ");
        }
        return jQuery.trim( className );
      break;
    default:
      break;
  }
}

jQuery.fn.extend({

  addClassNS: function( value ) {
    var classNames, i, l, elem,
      setClass, c, cl;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).addClass( value.call(this, j, this.className) );
      });
    }

    if ( value && typeof value === "string" ) {
      classNames = value.split( rspace );

      for ( i = 0, l = this.length; i < l; i++ ) {
        elem = this[ i ];
        if (typeof(elem.className)!="string"){
              $(elem).attr('class', changeClass(elem.className,classNames,'add',value));
          } else {
          if ( elem.nodeType === 1 ) {
            if ( !elem.className && classNames.length === 1 ) {
              $(elem).attr('class', value);
            } else {
              $(elem).attr('class', changeClass(elem.className,classNames,'add',value));
            }
          }
        }
      }
    }

    return this;
  },

  removeClassNS: function( value ) {
    var classNames, i, l, elem, className, c, cl;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).removeClass( value.call(this, j, this.className) );
      });
    }

    if ( (value && typeof value === "string") || value === undefined ) {
      classNames = ( value || "" ).split( rspace );

      for ( i = 0, l = this.length; i < l; i++ ) {
        elem = this[ i ];
        
        if (typeof(elem.className)!="string"){
          $(elem).attr('class', changeClass(elem.className,classNames,'remove',value));
        }     
        else 
        {
          if ( elem.nodeType === 1 && elem.className ) {
            if ( value ) {
              $(elem).attr('class', changeClass(elem.className,classNames,'remove',value));
            } else {
              $(elem).attr('class');
            }
          }
        }
      }
    }

    return this;
  },

  toggleClassNS: function( value, stateVal ) {
    var type = typeof value,
      isBool = typeof stateVal === "boolean";

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( i ) {
        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
      });
    }

    return this.each(function() {
      if ( type === "string" ) {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ),
          state = stateVal,
          classNames = value.split( rspace );

        while ( (className = classNames[ i++ ]) ) {
          // check each className given, space seperated list
          state = isBool ? state : !self.hasClass( className );
          self[ state ? "addClass" : "removeClass" ]( className );
        }

      } else if ( type === "undefined" || type === "boolean" ) {
        if ( this.className ) {
          // store className if set
          jQuery._data( this, "__className__", this.className );
        }

        // toggle whole className
        this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
      }
    });
  },

  hasClassNS: function( selector ) {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for ( ; i < l; i++ ) {
      if ( this[i].nodeType === 1 && (" " + this[i].className.baseVal + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
        return true;
      }
    }

    return false;
  }
});