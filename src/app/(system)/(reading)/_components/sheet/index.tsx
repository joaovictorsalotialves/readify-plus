import { forwardRef } from 'react'

import BottomSheet, {
  type BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

import { styles } from './styles'

type SheetProps = BottomSheetProps

export const Sheet = forwardRef<BottomSheet, SheetProps>(
  ({ children, snapPoints, ...rest }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.container}
        enableOverDrag={false}
        enablePanDownToClose={true}
        index={0}
        {...rest}
      >
        <BottomSheetView style={styles.content}>{children}</BottomSheetView>
      </BottomSheet>
    )
  }
)
