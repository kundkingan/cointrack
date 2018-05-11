import { Component, Inject  } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import {MatTableDataSource} from '@angular/material'
import {SelectionModel} from '@angular/cdk/collections'

import { AfDatabaseService } from '../services/af-database.service'

export interface Element {
  name: string
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  initialSelection = []
  displayedColumns = ['select', 'name']
  dataSource
  selection
  set = false

  constructor(
    private dbService: AfDatabaseService,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    console.log(data)
    this.initTable(data)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row))
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
  }

  private initTable(data) {
    let element_data: Element[] = []
    data.availableCoins.forEach(coin => element_data.push({name: coin}))

    this.initialSelection = data.userCoins.map(coin => {
      return element_data[data.availableCoins.indexOf(coin)]
    })

    this.dataSource = new MatTableDataSource<Element>(element_data)
    this.selection = new SelectionModel<Element>(true, this.initialSelection)
    this.set = true
  }

}


