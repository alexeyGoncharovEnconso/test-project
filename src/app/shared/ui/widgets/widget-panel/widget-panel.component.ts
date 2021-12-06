import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from 'angular-gridster2';

const BORDER_REMOVE_CLASS = 'column-without-border';
const COLUMN_WIDTH = 236;
const COLUMN_MARGIN = 10;

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent implements OnInit, OnDestroy {
  @ViewChild('gridsterItem', { static: true })
  gridsterItem: GridsterItemComponentInterface;
  options: GridsterConfig = {};
  widgetItem: GridsterItem;

  currentDraggedItemXCoordinate?: number;

  resizeObserver?: ResizeObserver;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit() {
    this.options = {
      gridType: GridType.Fixed,
      setGridSize: true,
      fixedColWidth: COLUMN_WIDTH,
      fixedRowHeight: 310,
      margin: COLUMN_MARGIN,
      minRows: 1,
      maxRows: 1,
      mobileBreakpoint: 0,
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

    this.widgetItem = { x: 0, y: 0, rows: 1, cols: 1 };

    this.resizeObserver = new ResizeObserver((entries) =>
      this.updateGridster(entries)
    );

    this.resizeObserver.observe(this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
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
      const prevColumn =
        itemComponent.gridster.el.querySelectorAll('.gridster-column')?.[
          this.currentDraggedItemXCoordinate
        ];
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

  /**
   * Moves the widget to an accessible column
   * @param columnsCount
   */
  moveWidgetItem(columnsCount: number) {
    if (columnsCount <= this.widgetItem.x && columnsCount !== 0) {
      this.itemDragStart(this.widgetItem, this.gridsterItem);
      this.widgetItem.x = columnsCount - 1;
      this.itemChange(this.widgetItem, this.gridsterItem);
    }
  }

  /**
   * set number of columns
   * @param columnsCount
   */
  changeColumnsCount(columnsCount) {
    if (this.options) {
      this.options.minCols = columnsCount;
      this.options.maxCols = columnsCount;
      this.options.api.optionsChanged();
    }
  }

  /**
   * updates gridster when the container is resized
   * @param entries entries of resize observable
   */
  updateGridster(entries: Array<ResizeObserverEntry>) {
    const entry = entries[0];
    const containerWidth = entry.contentBoxSize
      ? entry.contentBoxSize[0].inlineSize
      : entry.contentRect.width;

    const columnWidth = COLUMN_WIDTH + COLUMN_MARGIN;

    const columnsCount = Math.trunc(containerWidth / columnWidth);

    this.moveWidgetItem(columnsCount);
    this.changeColumnsCount(columnsCount);
  }
}
