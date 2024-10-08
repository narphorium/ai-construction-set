import { Block } from "../types/blocks";
import { ChildSelector } from "./selectors/ChildSelector";
import { DescendantSelector } from "./selectors/DescendantSelector";
import { BlockPropertyMatcher } from "./matchers/BlockPropertyMatcher";
import { TypeMatcher } from "./matchers/TypeMatcher";
import { ParentSelector } from "./selectors/ParentSelector";
import { BehaviorMatcher } from "./matchers/BehaviorMatcher";
import { TextMatcher } from "./matchers/TextMatcher";
import { PrecedentSiblingSelector } from "./selectors/PrecedentSiblingSelector";
import { SubsequentSiblingSelector } from "./selectors/SubsequentSiblingSelector";
import { BlockSelector } from "./selectors/BlockSelector";
import { Behavior } from "../types/behaviors";
import { BehaviorPropertyMatcher } from "./matchers/BehaviorPropertyMatcher";
import { AncestorSelector, SiblingSelector, VisibleSelector } from "./selectors";
import { BlockRegistry } from "./BlockRegistry";

export class BlockQuery {

  private type = "aics:query"

  constructor(protected registry: BlockRegistry, private matchers: BlockSelector[] = []) { }

  getMatchers() {
    return this.matchers;
  }

  chain(matchable: BlockSelector): BlockQuery {
    return new BlockQuery(this.registry, this.matchers.concat(matchable));
  }

  parent(): BlockQuery {
    return this.chain(new ParentSelector(this.registry));
  }

  children(): BlockQuery {
    return this.chain(new ChildSelector(this.registry));
  }

  siblings(): BlockQuery {
    return this.chain(new SiblingSelector(this.registry));
  }

  precedentSiblings(): BlockQuery {
    return this.chain(new PrecedentSiblingSelector(this.registry));
  }

  subsequentSiblings(): BlockQuery {
    return this.chain(new SubsequentSiblingSelector(this.registry));
  }

  descendants(): BlockQuery {
    return this.chain(new DescendantSelector(this.registry));
  }

  ancestors(): BlockQuery {
    return this.chain(new AncestorSelector(this.registry));
  }

  visible(): BlockQuery {
    return this.chain(new VisibleSelector(this.registry));
  }

  hasType(type: string) {
    return this.chain(new TypeMatcher(this.registry, type));
  }

  hasBehavior(behavior: string) {
    return this.chain(new BehaviorMatcher(this.registry, behavior));
  }

  hasProperty<T extends Block>(property: keyof T, value: any) {
    return this.chain(new BlockPropertyMatcher<T>(this.registry, property, value));
  }

  hasBehaviorProperty<T extends Behavior>(property: keyof T, value: any) {
    return this.chain(new BehaviorPropertyMatcher<T>(this.registry, property, value));
  }

  containsText<T extends Block>(property: keyof T, text: string) {
    return this.chain(new TextMatcher<T>(this.registry, property, text));
  }

}