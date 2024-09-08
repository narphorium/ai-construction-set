import { Block } from "../../types/blocks";
import { BlockMatcher } from "./BlockMatcher";
import { ChildSelector } from "../selectors/ChildSelector";
import { DescendantSelector } from "../selectors/DescendantSelector";
import { BlockPropertyMatcher } from "./BlockPropertyMatcher";
import { TypeMatcher } from "./TypeMatcher";
import { ParentSelector } from "../selectors/ParentSelector";
import { BehaviorMatcher } from "./BehaviorMatcher";
import { TextMatcher } from "./TextMatcher";
import { PrecedentSiblingSelector } from "../selectors/PrecedentSiblingSelector";
import { SubsequentSiblingSelector } from "../selectors/SubsequentSiblingSelector";
import { BlockSelector } from "../selectors/BlockSelector";
import { Behavior } from "../../types/behaviors";
import { BehaviorPropertyMatcher } from "./BehaviorPropertyMatcher";
import { AncestorSelector, SiblingSelector } from "../selectors";

export type Matchable = BlockMatcher | BlockSelector

export class BlockQuery {

  private type = "aics:query"

  constructor(private matchers: Matchable[] = []) { }

  getMatchers() {
    return this.matchers;
  }

  parent(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new ParentSelector()));
  }

  children(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new ChildSelector()));
  }

  siblings(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new SiblingSelector()));
  }

  precedentSiblings(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new PrecedentSiblingSelector()));
  }

  subsequentSiblings(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new SubsequentSiblingSelector()));
  }

  descendants(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new DescendantSelector()));
  }

  ancestors(): BlockQuery {
    return new BlockQuery(this.matchers.concat(new AncestorSelector()));
  }

  hasType(type: string) {
    return new BlockQuery(this.matchers.concat(new TypeMatcher(type)));
  }

  hasBehavior(behavior: string) {
    return new BlockQuery(this.matchers.concat(new BehaviorMatcher(behavior)));
  }

  hasProperty<T extends Block>(property: keyof T, value: any) {
    return new BlockQuery(this.matchers.concat(new BlockPropertyMatcher<T>(property, value)));
  }

  hasBehaviorProperty<T extends Behavior>(property: keyof T, value: any) {
    return new BlockQuery(this.matchers.concat(new BehaviorPropertyMatcher<T>(property, value)));
  }

  containsText<T extends Block>(property: keyof T, text: string) {
    return new BlockQuery(this.matchers.concat(new TextMatcher<T>(property, text)));
  }

}