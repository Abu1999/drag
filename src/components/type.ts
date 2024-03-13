// 元素基本属性
export interface Style {
  width: number | string,
  height: number | string,
  left: number | string,
  top: number | string,
  border: string
  [key: string]: any
}


export class ElementStyle {
  id: string
  style: Style = {
    width: 100,
    height: 30,
    left: 0,
    top: 0,
    border: '1px solid #ccc'
  }
  state: any = {
    data: 'auto'
  }

  constructor(data: any) {
    this.id = data.id
  }
}