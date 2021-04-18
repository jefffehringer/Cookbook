import { Component, OnInit } from '@angular/core';
import { Tag } from '@cook/models/tag.interface';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.scss'],
})
export class TagSearchComponent implements OnInit {
  showSearch = false;
  newTag = '';
  searchResults$ = this.tagService.items$;

  constructor(private tagService: TagService) { }

  ngOnInit( ) {}

  addTag() {
    const exist = this.tagService.findCached((i) => i.name.toLowerCase() === this.newTag.toLowerCase());
    if (exist) {
      this.tagService.pickTag(exist);
    } else {
      this.tagService.add({ id: -1, name: this.newTag });
    }

    this.clearSearch();

    /*if (this.newTag.length > 0) {
      // TODO: Clean this up
      if (this.recipe.id) {
        this.tagAdded.emit(this.newTag);
      } else {
        this.recipe.tags.push({ name: this.newTag, id: -1 });
      }
      this.newTag = '';
    }*/
  }

  searchTag(event) {
    this.showSearch = event.target.value.length > 0;
    this.tagService.search(event.target.value);
  }

  tagSelected(tag: Tag) {
    this.tagService.pickTag(tag);
    this.clearSearch();
  }

  clearSearch() {
    this.newTag = '';
    this.tagService.clearCached();
    this.showSearch = false;
  }

}
