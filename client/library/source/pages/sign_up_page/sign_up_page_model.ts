import { UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract load(): Promise<void>;
  public abstract uploadImage(): Promise<UserProfileImage>;
  public abstract signUp(password: string): Promise<void>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage
    ): Promise<void>;
  public abstract get email(): string;
  public abstract get defaultImage(): UserProfileImage;
  public abstract get avatars(): UserProfileImage[];
}
// 'resources/profile_set_up_page/icons/profile-image-0.svg'
/**
 * 
 * for (let i = 0; i < 20; ++i) {
      const src = `resources/profile_set_up_page/icons/profile-image-${i}.svg`;
      avatars.push(<AvatarWithCheckMark key={`avatar-${i}`} imageSrc={src}
        isMarked={i === this.state.markIndex}
        onClick={() => this.handleAvatarImageClick(src, i)} />);
    }
 */
