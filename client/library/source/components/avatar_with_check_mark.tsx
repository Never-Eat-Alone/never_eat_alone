import * as React from 'react';

interface Properties {
  /** Indicates whether the avatar has a checkmark on it or not. */
  isMarked: boolean;

  /** The src address of the avatar image. */
  imageSrc: string;

  /** Indicates the avatar is clicked. */
  onClick: () => void;
}

export class AvatarWithCheckMark extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={ICON_CONTAINER_STYLE} onClick={this.props.onClick} >
        <img
          style={ICON_STYLE}
          src={this.props.imageSrc}
          alt='Avatar'
        />
        <div style={{ display: this.props.isMarked && 'block' || 'none',
            ...RING_STYLE}}
        >
          <div style={CHECKMARK_CONTAINER_STYLE} >
            <img
              style={CHECKMARK_ICON_STYLE}
              src='resources/profile_set_up_page/icons/check.svg'
              alt='Checkmark Icon'
            />
          </div>
        </div>
      </div>);
  }
}

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '68px',
  width: '68px'
};

const ICON_STYLE: React.CSSProperties = {
  height: '100%',
  width: '100%',
  minWidth: '68px',
  minHeight: '68px',
  backgroundColor: 'transparent',
  objectFit: 'cover',
  borderRadius: '50%',
  overflow: 'hidden'
};

const RING_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '0px',
  border: '3px solid #5EC745',
  borderRadius: '50%',
  width: '100%',
  height: '100%'
};

const CHECKMARK_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  bottom: '-1px',
  right: '-1px',
  backgroundColor: 'transparent',
  width: '17px',
  height: '17px'
};

const CHECKMARK_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '17px',
  minHeight: '17px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};
