import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]= [new Recipe("A test Recipe", 
  "Eating", "https://static.toiimg.com/photo/76179976.cms")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
