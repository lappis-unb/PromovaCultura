<template>
    <div>
        <div class="modal fade" id="modal-legend" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Legendas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <legend-vertical-scroll-group :legends="legends" />
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import LegendVerticalScrollGroup from "@/components/mapPrototype/legends/LegendVerticalScrollGroup";
export default {
    props: {
        legends: {},
    },
    components: {
        "legend-vertical-scroll-group": LegendVerticalScrollGroup,
    },
};
</script>