import { IconButton } from "@chakra-ui/react"

const GhostButton = ({
    ariaLabel,
    icon,
    color,
    ...otherProps
}) => {
    return (
        <IconButton
            aria-label={ariaLabel}
            icon={icon}
            color={color}
            variant={'ghost'}
            _hover={{ bg: 'none' }}
            _active={{ bg: 'none', color: 'rgba(255, 255, 255, 0.7)' }}
            {...otherProps}
        />
    )
}

export default GhostButton;