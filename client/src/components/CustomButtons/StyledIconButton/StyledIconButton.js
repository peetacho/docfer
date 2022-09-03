import { IconButton } from "@chakra-ui/react"

const StyledIconButton = ({
    bg,
    hw,
    icon,
    ...otherProps
}) => {
    return (
        <IconButton
            bg={bg}
            height={hw}
            width={hw}
            isRound
            icon={icon}
            _hover={{ bg: bg }}
            _active={{ bg: bg }}
            {...otherProps}
        />
    )
}

export default StyledIconButton;