import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from 'angular-gridster2';

const BORDER_REMOVE_CLASS = 'column-without-border';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent implements OnInit {
  options: GridsterConfig = {};
  dashboard: Array<GridsterItem> = [];

  currentDraggedItemXCoordinate?: number;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.options = {
      gridType: GridType.Fixed,
      setGridSize: true,
      fixedColWidth: 200,
      fixedRowHeight: 280,
      minCols: 4,
      maxCols: 4,
      margin: 10,
      minRows: 1,
      maxRows: 1,
      displayGrid: DisplayGrid.Always,
      disableScrollHorizontal: true,
      disableScrollVertical: true,
      compactType: CompactType.None,
      resizable: {
        enabled: false,
      },
      draggable: {
        enabled: true,
        ignoreContent: true, // if true drag will start only from elements from `dragHandleClass`
        dragHandleClass: 'drag-handler', // drag event only from this class. If `ignoreContent` is true.
        start: this.itemDragStart.bind(this), // callback when dragging an item starts.
      },
      itemInitCallback: this.itemChange.bind(this),
      itemChangeCallback: this.itemChange.bind(this), // remove border from init cell
    };

    this.dashboard = [{ x: 0, y: 0, rows: 1, cols: 1 }];
  }

  /**
   * Add and remove cell borders
   * @param item 
   * @param itemComponent 
   */
  itemChange(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    const currentColumn =
      itemComponent.gridster.el.querySelectorAll('.gridster-column')?.[item.x];
    if (currentColumn) {
      this.renderer.addClass(currentColumn, BORDER_REMOVE_CLASS);
    }
    if (this.currentDraggedItemXCoordinate !== undefined) {
      const prevColumn = itemComponent.gridster.el.querySelectorAll('.gridster-column')?.[this.currentDraggedItemXCoordinate];
      if (prevColumn) {
        this.renderer.removeClass(prevColumn, BORDER_REMOVE_CLASS);
      }
    }
  }

  /**
   * Set coordinate of previous position of draggable element
   * @param item 
   * @param itemComponent 
   */
  itemDragStart(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    this.currentDraggedItemXCoordinate = item.x;
  }
}
