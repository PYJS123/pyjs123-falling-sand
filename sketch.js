let rows, cols;
let w=15;
let emptyGrid=[];
let grid=[];
let period=3;
// let temp=0;

function setup() {
  createCanvas(600, 600);
  cols=floor(width/w);
  rows=floor(height/w);
  // fill('#cfc27e');
  noStroke();
  
  for (let i=0; i<cols; i++) {
    emptyGrid.push([]);
    for (let j=0; j<rows; j++) {
      emptyGrid[i].push([0, color(50, 50, 50)]);
    }
  }
  grid=structuredClone(emptyGrid);
}

function draw() {
  colorMode(HSB);
  background(0, 0, 86);
  
  let curr=color(frameCount%360, 40, 50);
  // if (temp==5) {noLoop();console.log(grid)}
  if (mouseIsPressed && inCnv(mouseX, mouseY)) {
    let x, y;
    x=floor(mouseX/width*rows);
    y=floor(mouseY/height*cols);
    grid[x][y]=[1, structuredClone(curr)];
    // grid[x]=1;
    // grid[y]=curr;
    // for (let i=x; i<=x+1; i++) {
    //   for (let j=y; j<=y+1; j++) {
    //     if (typeof grid[i][j]!=='undefined') {
    //       grid[i][j]=1;
    //     }
    //   }
    // }
    // temp++;
  }
  
  let newGrid=structuredClone(emptyGrid);
  // console.log(grid[0][10]);
  
  for (let i=0; i<cols; i++) {
    for (let j=rows-1; j>0; j--) {
      if (grid[i][j][0]==1 || grid[i][j][0]==2) {
        // fill(grid[i][j][1]);
        colorMode(RGB);
        let temp=grid[i][j][1].levels;
        fill(temp[0], temp[1], temp[2]);
        // let temp=color(50, 50, 50);
        // fill(temp);
        square(i/rows*width, j/cols*height, w);
      }
      if (frameCount % period == 0) {
        if (grid[i][j][0]!=0) {
          if ((j==rows-1 || grid[i][j+1][0]==2)) {
            grid[i][j][0]=2;
          } else {
            grid[i][j][0]=1;
          }
        }
        
        if (grid[i][j][0]==2) {
          newGrid[i][j][0]=2;
          newGrid[i][j][1]=grid[i][j][1];
        } else if (grid[i][j][0]==0 && grid[i][j-1][0]==0 || grid[i][j][0]==1 && grid[i][j-1][0]==0 && grid[i][j+1][0]!=2) {
          newGrid[i][j][0]=0;
//           if(i==0 && j==1 && grid[i][j]==1) console.log('empty');
        } else {
          newGrid[i][j][0]=1;
          newGrid[i][j][1]=grid[i][j-1][1];
        }
      }
    }
  }
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      if (newGrid[i][j][0]==2) {
        // if (i>0 && newGrid[i-1][j+1][0]==0) {
        //   newGrid[i-1][j+1]=1;
        //   newGrid[i][j]=0;
        // } else if (i<rows-1 && newGrid[i+1][j+1]==0) {
        //   newGrid[i+1][j+1]=1;
        //   newGrid[i][j]=0;
        // }
        switch(floor(random()*2)) {
          case 0:
            if (i>0 && typeof newGrid[i-1][j+1]!=='undefined' && newGrid[i-1][j+1][0]==0) {
              newGrid[i-1][j+1][0]=1;
              newGrid[i-1][j+1][1]=newGrid[i][j][1];
              newGrid[i][j][0]=0;
            } else if (i<rows-1 && typeof newGrid[i+1][j+1]!=='undefined' && newGrid[i+1][j+1][0]==0) {
              newGrid[i+1][j+1][0]=1;
              newGrid[i+1][j+1][1]=newGrid[i][j][1];
              newGrid[i][j][0]=0;
            }
            break;
          case 1:
            if (i<rows-1 && typeof newGrid[i+1][j+1]!=='undefined' && newGrid[i+1][j+1][0]==0) {
              newGrid[i+1][j+1][0]=1;
              newGrid[i+1][j+1][1]=newGrid[i][j][1];
              newGrid[i][j][0]=0;
            } else if (i>0 && typeof newGrid[i-1][j+1]!=='undefined' && newGrid[i-1][j+1][0]==0) {
              newGrid[i-1][j+1][0]=1;
              newGrid[i-1][j+1][1]=newGrid[i][j][1];
              newGrid[i][j][0]=0;
            } 
            break;
          default:
            // pass
        }
      }
    }
  }
  if (frameCount % period == 0) {
    grid=structuredClone(newGrid);
  }
}

function inCnv(x, y) {
  return x>0 && y>0 && x<width && y<height;
}
